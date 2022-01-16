import { Playlist } from "myply-common"
import { GDesc, IDesc, IRegular, LoadSVG } from "components"
import React from "react"
import { Hexile, Vexile } from "@haechi/flexile"

export const PlaylistItem: React.FC<Playlist> = (props) => {
    return (
        <Vexile gap={1.5}>
            <Vexile>
                <IRegular>{props.name}</IRegular>
                <Hexile y="center">
                    <LoadSVG height={3} width={2} src="/icons/song.svg" />
                    <IDesc>{props.tracks.length}곡</IDesc>
                </Hexile>
            </Vexile>
            <GDesc>
                {props.tracks
                    .slice(0, 5)
                    .map((e) => e.name)
                    .join(", ")}
                {props.tracks.length > 5
                    ? `외 ${props.tracks.length - 1}곡`
                    : null}
            </GDesc>
        </Vexile>
    )
}
