import { GDesc, Hexile, IRegular, Vexile } from "components"
import { Song } from "myply-common"

export const SongItem: React.FC<Song & { index: number }> = (song) => (
    <Vexile gap={3}>
        <Hexile gap={6} y="center">
            <GDesc>{song.index + 1}</GDesc>
            <Vexile gap={1}>
                <IRegular>{song.name}</IRegular>
                <GDesc>{song.artist}</GDesc>
            </Vexile>
        </Hexile>
    </Vexile>
)
