import { connectDatabase, Database, Relation } from "database"
import { Playlist } from "myply-common"

export let playlistDatabase: Database<Omit<Playlist, "tracks"> & {
    tracks: Relation
}>;

export const initDatabase = async () => {
    if (playlistDatabase) return
    playlistDatabase = await connectDatabase("Playlist")
}
