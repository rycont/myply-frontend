import { NextApiHandler } from "next"
import { initDatabase, playlistDatabase } from "database"

export default <NextApiHandler>(async (_, res) => {
    await initDatabase()
    const recents = await playlistDatabase.get({
        sorts: [
            {
                timestamp: "created_time",
                direction: "descending",
            },
        ],
        page_size: 8,
    })

    res.json(recents)
})
