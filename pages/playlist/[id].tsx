import { MouseEventHandler, useEffect, useState } from "react"
import { Adaptor, Playlist } from "myply-common"
import { BulletList } from "react-content-loader"
import { Hexile, Vexile } from "@haechi/flexile"
import { useRecoilState } from "recoil"
import { useRouter } from "next/router"
import { NextPage } from "next"
import axios from "axios"
import { CopyArea, CopyUrl } from "./style"
import { modalContentAtom } from "coil"
import { useConnect } from "connector"
import { SongItem } from "./partial"
import {
    Fab,
    Header,
    IRegular,
    LoadSVG,
    ProviderSelector,
    Readable,
    XDesc,
} from "components"
import { Doc } from "types"
import { getAnalytics, logEvent } from "firebase/analytics"
import { analytics } from "analytics"

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
        if (router.query.first === "") {
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
            router.push(router.asPath.split("?")[0])
        }
    }, [router, setModal])

    useEffect(() => {
        if (playlist) document.title = `${playlist.name} : 마이플리`
    }, [playlist])

    if (!playlist) return <BulletList />

    const createUri = async (seleted: Adaptor) => {
        setModal({
            title: "잠시만 기다려주세요 ..",
            content:
                "플리를 불러오고 있어요. 최대 1분정도 소요될 수 있고, 플리가 열리기 전까지 조금만 기다려주세요😉! 빈 창만 열리고 플리 재생이 시작되지 않으면 이전 화면으로 돌아가서 서비스를 다시 선택해주세요.",
            dismissable: false,
        })
        logEvent(getAnalytics(), "start_playlist", {
            provider: seleted.determinator[0],
            id: playlist._id,
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
                <IRegular>내 음악 앱으로 열기</IRegular>
                <LoadSVG
                    alt="재생 아이콘"
                    src="/icons/speaker.svg"
                    width={5}
                    height={5}
                />
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
