import { connectDatabase, Database, Relation } from "database"
import { Playlist, Song } from "myply-common"

export let playlistDatabase: Database<Omit<Playlist, "tracks"> & {
    tracks: Relation
}>;

export let songDatabase: Database<Omit<Song, "channelIds"> & {
    channelIds: string
}>;

export const initDatabase = async () => {
    if (!playlistDatabase)
        playlistDatabase = await connectDatabase("Playlist")

    if (!songDatabase)
        songDatabase = await connectDatabase("Song")
}
