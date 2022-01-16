import { Hexile, Vexile } from "@haechi/flexile"
import axios from "axios"
import {
    Fab,
    Header,
    IRegular,
    LoadSVG,
    ProviderSelector,
    XDesc,
} from "components"
import { initDatabase, playlistDatabase } from "database"
import { Playlist, Song } from "myply-common"
import { GetServerSideProps } from "next"
import { useState } from "react"
import { Doc } from "types"
import { SongItem } from "./partial"

export const NewPlaylist: React.FC<{ playlist: Doc<Playlist> }> = ({
    playlist,
}) => {
    const [isSelectorOpen, setSelectorOpen] = useState(false)
    return (
        <Vexile gap={9}>
            <Vexile gap={1}>
                <Header>{playlist.name}</Header>
                <XDesc>{playlist.tracks.length}개 곡</XDesc>
            </Vexile>
            <Vexile gap={5}>
                {playlist.tracks.map((song) => (
                    <SongItem song={song} />
                ))}
            </Vexile>
            <Fab onClick={() => setSelectorOpen(true)}>
                <Hexile gap={1} y="center">
                    <IRegular>내 음악 앱으로 열기</IRegular>
                    <LoadSVG src="/icons/speaker.svg" width={5} height={5} />
                </Hexile>
            </Fab>
            {isSelectorOpen && (
                <ProviderSelector
                    close={() => setSelectorOpen(false)}
                    onClick={async (e) => {
                        window.open(
                            (
                                await axios(
                                    `/api/${playlist._id}/${e.determinator[0]}`
                                )
                            ).data.uri
                        )
                        setSelectorOpen(false)
                    }}
                />
            )}
        </Vexile>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    await initDatabase()
    if (!params) return { props: {} }
    const playlist = await playlistDatabase.findById<{
        tracks: Song[]
    }>(params.id as string, ["tracks"])

    return {
        props: {
            playlist,
        },
    }
}

export default NewPlaylist
