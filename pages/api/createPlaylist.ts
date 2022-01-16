import { initDatabase, playlistDatabase, songDatabase } from "database"
import { Playlist, Song } from "myply-common"
import { NextApiHandler } from "next"
import { fetchPlaylist } from "process/fetchPlaylist"
import { Doc } from "types"

async function mergeWithDatabase(song: Song): Promise<Doc<Song>> {
    const [preGenerated] = await songDatabase.get({
        filter: {
            and: [
                {
                    property: "name",
                    text: {
                        equals: song.name,
                    },
                },
                {
                    property: "artist",
                    text: {
                        equals: song.artist,
                    },
                },
            ],
        },
    })

    if (preGenerated) {
        const channelIds = JSON.parse(preGenerated.channelIds) as Record<
            string,
            string
        >
        if (channelIds[Object.keys(song.channelIds)[0]])
            return {
                ...(preGenerated as Omit<Song, "channelIds"> & {
                    channelIds: string
                } & { _id: string }),
                channelIds: JSON.parse(preGenerated.channelIds) as Record<
                    string,
                    string
                >,
            }

        await songDatabase.update(preGenerated._id, {
            channelIds: JSON.stringify({
                ...channelIds,
                ...song.channelIds,
            }),
        })

        return {
            ...(preGenerated as Omit<Song, "channelIds"> & {
                channelIds: string
            } & { _id: string }),
            channelIds: {
                ...channelIds,
                ...song.channelIds,
            },
        }
    }

    const createdId = await songDatabase.create({
        ...song,
        channelIds: JSON.stringify(song.channelIds),
    })

    return { ...song, _id: createdId }
}

export default <NextApiHandler>(async (req, res) => {
    await initDatabase()

    const fetched = (await fetchPlaylist(
        req.body.playlistURI as string
    )) as Playlist

    const merged = await Promise.all(
        fetched.tracks.slice(0, 25).map(mergeWithDatabase)
    )

    const createdId = await playlistDatabase.create({
        ...fetched,
        tracks: {
            type: "Relation",
            target: merged
                .map((e) => ({
                    ...e,
                    channelIds: JSON.stringify(e.channelIds),
                }))
                .map((e) => e._id),
        },
        preGenerated: JSON.stringify(fetched.preGenerated),
    })

    res.json({ createdId })
})
