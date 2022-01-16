import { providers } from "constant"
import { initDatabase, playlistDatabase, songDatabase } from "database"
import { Playlist, Song } from "myply-common"
import { NextApiHandler } from "next"

const createUri: NextApiHandler = async (req, res) => {
    await initDatabase()
    const playlist = await playlistDatabase.findById<{
        tracks: Song[]
    }>(req.query.playlistId as string, ["tracks"])

    const provider = providers.find(
        (e) => e.determinator[0] === req.query.providerId
    )
    if (!provider)
        throw new Error(`Cannot find provider ${req.query.providerId}`)

    const playlistWithParsed: Playlist = {
        ...playlist,
        preGenerated: JSON.parse(playlist.preGenerated || "{}"),
    }

    const preGenerated =
        playlistWithParsed.preGenerated[req.query.providerId as string]

    console.log("PRE", preGenerated)
    if (preGenerated)
        return res.json({
            uri: preGenerated,
        })

    const tracks = (
        await Promise.all(
            playlistWithParsed.tracks.map(async (_song) => {
                const song = _song as unknown as Omit<Song, "channelIds"> & {
                    channelIds: string
                    _id: string
                }
                const prefetchedIds = JSON.parse(song.channelIds)
                if (prefetchedIds[req.query.providerId as string])
                    return {
                        ...song,
                        channelIds: prefetchedIds,
                    }

                const id = await provider.findSongId({
                    ...song,
                    channelIds: prefetchedIds,
                })

                if (!id) return null

                await songDatabase.update(song._id, {
                    channelIds: JSON.stringify({
                        ...prefetchedIds,
                        [req.query.providerId as string]: id,
                    }),
                })

                return {
                    ...song,
                    channelIds: {
                        ...prefetchedIds,
                        [req.query.providerId as string]: id,
                    },
                }
            })
        )
    ).filter(Boolean) as Song[]

    const uri = await provider.generateURL({
        ...playlistWithParsed,
        tracks,
    })

    playlistDatabase.update(req.query.playlistId as string, {
        preGenerated: JSON.stringify({
            ...playlistWithParsed.preGenerated,
            [req.query.providerId as string]: uri,
        }),
    })

    res.json({
        uri,
    })
}

export default createUri
