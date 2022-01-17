import { Vexile } from "@haechi/flexile"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
import { useState } from "react"
import axios from "axios"
import "josa-complete"
import { Button, Header, Input, XDesc } from "components"
import { modalContentAtom } from "coil"
import { providers } from "constant"
import { connect } from "connector"

export const NewPlaylist: React.FC = () => {
    const [playlistURI, setPlaylistURI] = useState<string>()
    const setModal = useRecoilState(modalContentAtom)[1]
    const router = useRouter()

    const processPlaylist = async () => {
        setModal({
            title: "잠시만 기다려주세요 ..",
            content: "플레이리스트에 어떤 노래가 담겨있는지 읽고 있어요",
            dismissable: false,
        })

        try {
            const { createdId } = await connect<unknown, { createdId: string }>(
                "createPlaylist",
                {
                    playlistURI,
                }
            )
            setModal(null)
            router.push(`/playlist/${createdId}?first`)
        } catch (e) {
            if (axios.isAxiosError(e))
                setModal({
                    title: e.response?.data.message,
                    content: `${
                        providers.map((e) => e.display.name).join(", ").을를
                    } 지원해요.`,
                    dismissable: true,
                    button: {
                        action: () => setModal(null),
                        label: "닫기",
                    },
                })
        }
    }

    return (
        <Vexile filly css={{ flex: 1 }} gap={6} y="center" x="center">
            <Vexile gap={1.5} x="center">
                <Header>내 플리 공유</Header>
                <XDesc center>
                    플리 URL을 입력해주세요. 멜론, 스포티파이, 지니, 플로를
                    지원해요.
                </XDesc>
            </Vexile>
            <Input
                placeholder="URL 입력"
                icon="/icons/link.svg"
                onChange={setPlaylistURI}
            />
            <Button
                disabled={!playlistURI}
                onClick={playlistURI ? processPlaylist : undefined}
            >
                다음
            </Button>
        </Vexile>
    )
}

export default NewPlaylist
