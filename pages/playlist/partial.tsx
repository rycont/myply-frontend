import { Hexile, Vexile } from "@haechi/flexile"
import { GDesc, IRegular } from "components"
import { Song } from "myply-common"

export const SongItem = ({ song, ...props }: { song: Song; index: number }) => (
    <Hexile gap={6} y="center">
        <GDesc>{props.index}</GDesc>
        <Vexile gap={1}>
            <IRegular>{song.name}</IRegular>
            <GDesc>{song.artist}</GDesc>
        </Vexile>
    </Hexile>
)
