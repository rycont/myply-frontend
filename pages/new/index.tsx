import { Vexile } from "@haechi/flexile"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
import { useState } from "react"
import Head from "next/head"
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
            content:
                "플레이리스트에 어떤 노래가 담겨있는지 읽고 있어요. 최대 1분이 소요될 수 있으니, 페이지를 이동하지 말고 조금만 기다려주세요😊",
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
        <>
            <Head>
                <link rel="icon" href="/favicon.svg" />
                <title>내 플리 공유 : 마이플리</title>
            </Head>
            <Vexile filly css={{ flex: 1 }} gap={6} y="center" x="center">
                <Vexile gap={2} x="center">
                    <Header>내 플리 공유</Header>
                    <XDesc center>
                        플리 URL을 입력해주세요.{" "}
                        {providers.map((e) => e.display.name).join(", ").을를}{" "}
                        지원해요.
                    </XDesc>
                    <XDesc center>
                        최대 25개의 곡을 공유할 수 있어요. 플리에 담긴 노래가
                        25개보다 많을 때는 앞에서 25개만 공유돼요.
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
        </>
    )
}

export default NewPlaylist
