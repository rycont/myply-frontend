import { connectDatabase, Database, Relation } from "database"
import { Playlist, Song } from "myply-common"

export let playlistDatabase: Database<
    Omit<Omit<Playlist, "tracks">, "preGenerated"> & {
        tracks: Relation
        preGenerated: string
    }
>

export let songDatabase: Database<
    Omit<Song, "channelIds"> & {
        channelIds: string
    }
>

export const initDatabase = async () => {
    if (!playlistDatabase) playlistDatabase = await connectDatabase("Playlist")

    if (!songDatabase) songDatabase = await connectDatabase("Song")
}
