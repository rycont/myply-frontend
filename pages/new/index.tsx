import { Vexile } from "@haechi/flexile"
import { modalContentAtom } from "coil"
import { Button, Header, Input, XDesc } from "components"
import { connect } from "connector"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useRecoilState } from "recoil"

export const NewPlaylist: React.FC = () => {
    const [playlistURI, setPlaylistURI] = useState<string>()
    const setModal = useRecoilState(modalContentAtom)[1]
    const router = useRouter()

    const processPlaylist = async () => {
        setModal({
            title: "잠시만 기다려주세요 ..",
            content: "플레이리스트 주소를 가져오고 있어요",
            dismissable: true,
        })

        const { createdId } = await connect<unknown, { createdId: string }>(
            "createPlaylist",
            {
                playlistURI,
            }
        )

        setModal(null)

        router.push(`/playlist/${createdId}`)
    }

    return (
        <Vexile filly gap={6} y="center" x="center">
            <Vexile gap={1.5} x="center">
                <Header>내 플리 공유</Header>
                <XDesc>플리 URL을 입력해주세요</XDesc>
            </Vexile>
            <Input
                placeholder="URL 입력"
                icon="/icons/link.svg"
                onChange={setPlaylistURI}
            />
            <Button onClick={processPlaylist}>다음</Button>
        </Vexile>
    )
}

export default NewPlaylist
