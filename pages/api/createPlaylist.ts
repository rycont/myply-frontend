import { Playlist, Song } from "myply-common"
import { initDatabase, playlistDatabase, songDatabase } from "database"
import { fetchPlaylist } from "process/fetchPlaylist"
import { apiHandler } from "error"
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

export default apiHandler(async (req, res) => {
    await initDatabase()

    const fetched = (await fetchPlaylist(
        req.body.playlistURI as string
    )) as Playlist

    console.log(fetched)

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
        briefContent: `${fetched.tracks
            .slice(0, 5)
            .map((e) => e.name)
            .join(", ")}
        ${
            fetched.tracks.length > 5
                ? ` 외 ${Math.min(fetched.tracks.length, 25) - 5}곡`
                : null
        }`,
    })

    res.json({ createdId })
})
