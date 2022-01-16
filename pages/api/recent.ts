import { initDatabase, playlistDatabase } from "database"
import { Song } from "myply-common"
import { NextApiHandler } from "next"

export default <NextApiHandler>(async (_, res) => {
    await initDatabase()
    const recents = await playlistDatabase.get<{
        tracks: Song[]
    }>(
        {
            sorts: [
                {
                    timestamp: "created_time",
                    direction: "ascending",
                },
            ],
        },
        ["tracks"]
    )

    res.json(
        recents,
     )
})