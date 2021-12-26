import { Button, GDesc, Header, Input, Vexile, XDesc } from "components"
import Link from "next/link"
import { useEffect, useState } from "react"

export const NewPlaylist: React.FC = () => {
    const [playlistURI, setPlaylistURI] = useState<string>()
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
                    <Button>다음</Button>
                </a>
            </Link>
        </Vexile>
    )
}

export default NewPlaylist
