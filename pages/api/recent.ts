import { NextApiHandler } from "next"
import { Song } from "myply-common"
import { initDatabase, playlistDatabase } from "database"

export default <NextApiHandler>(async (_, res) => {
    await initDatabase()
    const recents = await playlistDatabase.get<{
        tracks: Song[]
    }>(
        {
            sorts: [
                {
                    timestamp: "created_time",
                    direction: "descending",
                },
            ],
            page_size: 10,
        },
        ["tracks"]
    )

    res.json(recents)
})
