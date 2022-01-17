import React from "react"
import { Playlist } from "myply-common"
import { Hexile, Vexile } from "@haechi/flexile"
import { GDesc, IDesc, IRegular, LoadSVG, Redirector } from "components"

export const PlaylistItem: React.FC<Playlist> = (props) => {
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
                    <IDesc>{props.tracks.length}곡</IDesc>
                </Hexile>
            </Vexile>
            <GDesc>
                {props.tracks
                    .slice(0, 5)
                    .map((e) => e.name)
                    .join(", ")}
                {props.tracks.length > 5
                    ? ` 외 ${props.tracks.length - 5}곡`
                    : null}
            </GDesc>
        </Vexile>
    )
}

export default Redirector
