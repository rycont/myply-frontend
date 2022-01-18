import { Playlist } from "myply-common"

export type Doc<T> = T & {
    _id: string
}

export interface PlaylistWithBriefContent extends Playlist {
    briefContent: string
}
