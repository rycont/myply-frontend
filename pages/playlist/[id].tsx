import { Hexile, Vexile } from "@haechi/flexile"
import axios from "axios"
import { modalContentAtom } from "coil"
import {
    Fab,
    Header,
    IRegular,
    LoadSVG,
    ProviderSelector,
    XDesc,
} from "components"
import { useConnect } from "connector"
import { Adaptor, Playlist } from "myply-common"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BulletList } from "react-content-loader"
import { useRecoilState } from "recoil"
import { Doc } from "types"
import { SongItem } from "./partial"

export const NewPlaylist: NextPage = ({}) => {
    const router = useRouter()
    const playlist = useConnect<unknown, Doc<Playlist>>(router.asPath, null)
    const setModal = useRecoilState(modalContentAtom)[1]

    const [isSelectorOpen, setSelectorOpen] = useState(false)

    useEffect(() => {
        if (playlist) document.title = `${playlist.name} : 마이플리`
    }, [playlist])

    if (!playlist) return <BulletList />

    const createUri = async (seleted: Adaptor) => {
        setModal({
            title: "잠시만 기다려주세요 ..",
            content: "플레이리스트 주소를 만들고 있어요",
            dismissable: false,
        })
        window
            .open(
                (
                    await axios(
                        `/api/playlist/${playlist._id}/${seleted.determinator[0]}`
                    )
                ).data.uri,
                "_blank"
            )
            ?.focus()
        setModal(null)
        setSelectorOpen(false)
    }

    return (
        <Vexile gap={9}>
            <Vexile gap={1}>
                <Header>{playlist.name}</Header>
                <XDesc>{playlist.tracks.length}개 곡</XDesc>
            </Vexile>
            <Vexile gap={5}>
                {playlist.tracks.map((song, i) => (
                    <SongItem
                        song={song}
                        index={i + 1}
                        key={song.artist + song.name + i}
                    />
                ))}
            </Vexile>
            <Fab onClick={() => setSelectorOpen(true)}>
                <Hexile gap={1} y="center">
                    <IRegular>내 음악 앱으로 열기</IRegular>
                    <LoadSVG
                        alt="재생 아이콘"
                        src="/icons/speaker.svg"
                        width={5}
                        height={5}
                    />
                </Hexile>
            </Fab>
            {isSelectorOpen && (
                <ProviderSelector
                    close={() => setSelectorOpen(false)}
                    onClick={createUri}
                />
            )}
        </Vexile>
    )
}

export default NewPlaylist
