import { connectDatabase, Database, Relation } from "database"
import { Playlist } from "myply-common"

export let playlistDatabase: Database<Omit<Playlist, "tracks"> & {
    tracks: Relation
}>;

(async () => {
    playlistDatabase = await connectDatabase("Playlist")
})()
