import React from "react"
import { Playlist } from "myply-common"
import { Hexile, Vexile } from "@haechi/flexile"
import { GDesc, IDesc, IRegular, LoadSVG, Redirector } from "components"
import { PlaylistWithBriefContent } from "types"
import { Relation } from "database"

export const PlaylistItem: React.FC<
    Omit<PlaylistWithBriefContent, "tracks"> & { tracks: Relation }
> = (props) => {
    return (
        <Vexile gap={1.5}>
            <Vexile>
                <IRegular>{props.name}</IRegular>
                <Hexile y="center">
                    <LoadSVG
                        alt="노래 갯수 아이콘"
                        height={3}
                        width={2}
                        src="/icons/song.svg"
                    />
                    <IDesc>{props.tracks.target.length}곡</IDesc>
                </Hexile>
            </Vexile>
            <GDesc>{props.briefContent}</GDesc>
        </Vexile>
    )
}

export default Redirector
