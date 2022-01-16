import { initDatabase, playlistDatabase } from "database"
import { Song } from "myply-common"
import { NextApiHandler } from "next"

export default <NextApiHandler>(async (req, res) => {
    console.log("주소", req.query.playlistId)

    await initDatabase()
    if (!req.query.playlistId || req.query.playlistId.length < 6) {
        return res.status(404)
    }

    const playlist = await playlistDatabase.findById<{
        tracks: Song[]
    }>(req.query.playlistId as string, ["tracks"])

    res.json(playlist)
})
