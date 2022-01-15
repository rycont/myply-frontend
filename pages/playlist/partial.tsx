import { GDesc, Hexile, IRegular, Vexile } from "components"
import { Song } from "myply-common"

export const SongItem = ({ song }: { song: Song }) => (
    <Hexile gap={6} y="center">
        <GDesc>1</GDesc>
        <Vexile gap={1}>
            <IRegular>{song.name}</IRegular>
            <GDesc>{song.artist}</GDesc>
        </Vexile>
    </Hexile>
)
