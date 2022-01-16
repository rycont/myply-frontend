import { Vexile } from "@haechi/flexile"
import { modalContentAtom } from "coil"
import { Button, Header, Input, XDesc } from "components"
import Link from "next/link"
import { useState } from "react"
import { useRecoilState } from "recoil"

export const NewPlaylist: React.FC = () => {
    const [playlistURI, setPlaylistURI] = useState<string>()
    const setModal = useRecoilState(modalContentAtom)[1]

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
            <Link
                href={{
                    pathname: "/fetch-uri",
                    query: {
                        playlistURI,
                    },
                }}
            >
                <a>
                    <Button
                        onClick={() =>
                            setModal({
                                title: "잠시만 기다려주세요 ..",
                                content: "플레이리스트 주소를 가져오고 있어요",
                                dismissable: true,
                            })
                        }
                    >
                        다음
                    </Button>
                </a>
            </Link>
        </Vexile>
    )
}

export default NewPlaylist
