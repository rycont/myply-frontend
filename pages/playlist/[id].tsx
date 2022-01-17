import { Hexile, Vexile } from "@haechi/flexile"
import axios from "axios"
import { modalContentAtom } from "coil"
import {
    Fab,
    GDesc,
    Header,
    IRegular,
    LoadSVG,
    ProviderSelector,
    Readable,
    XDesc,
} from "components"
import { useConnect } from "connector"
import { Adaptor, Playlist } from "myply-common"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { MouseEventHandler, useEffect, useState } from "react"
import { BulletList } from "react-content-loader"
import { useRecoilState } from "recoil"
import { Doc } from "types"
import { SongItem } from "./partial"
import { CopyArea, CopyUrl } from "./style"

export const NewPlaylist: NextPage = ({}) => {
    const router = useRouter()
    const playlist = useConnect<unknown, Doc<Playlist>>(router.asPath, null)
    const setModal = useRecoilState(modalContentAtom)[1]

    const [isSelectorOpen, setSelectorOpen] = useState(false)

    const copyAll: MouseEventHandler = (e) => {
        e.stopPropagation()
        if (!e.target || !window) return

        const range = document.createRange()
        range.selectNode(e.target as HTMLParagraphElement)
        window.getSelection()?.removeAllRanges()
        window.getSelection()?.addRange(range)
    }

    useEffect(() => {
        console.log(router)
        if (router.query.first === "")
            setModal({
                title: "성공적으로 업로드했어요! 👍",
                content: (
                    <Vexile gap={4}>
                        <Readable>
                            아래 링크를 공유하면 다른 사람이 플레이리스트를
                            감상할 수 있어요
                        </Readable>
                        <CopyArea gap={2}>
                            <LoadSVG
                                alt="복사 아이콘"
                                height={3}
                                width={3}
                                src="/icons/copy.svg"
                            />
                            <CopyUrl onClick={copyAll}>
                                https://myply.rycont.ninja
                                {router.asPath.split("?")[0]}
                            </CopyUrl>
                        </CopyArea>
                    </Vexile>
                ),
                button: {
                    label: "확인👌",
                    action: () => setModal(null),
                },
                dismissable: true,
            })
    }, [router, setModal])

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
        try {
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
        } catch (e) {
            console.log(axios.isAxiosError(e))
            if (axios.isAxiosError(e)) {
                setModal({
                    title: "오류가 발생했어요..",
                    content: e.response?.data.message,
                    button: {
                        label: "닫기",
                        action: () => setModal(null),
                    },
                })
            }
        }
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
