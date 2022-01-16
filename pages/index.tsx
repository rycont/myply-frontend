import { Playlist } from "myply-common"
import { Fab, Header, LoadSVG, PlainLink } from "components"
import { PlaylistItem } from "./partial"
import { Doc } from "types"
import Link from "next/link"
import { Vexile } from "@haechi/flexile"
import { List } from "react-content-loader"
import { useConnect } from "connector"

export default function Home() {
    const recents = useConnect<undefined, Doc<Playlist>[]>("recent", undefined)
    return (
        <Vexile gap={3}>
            <Header>방금 올라온 플리</Header>
            {recents ? (
                recents.map((recent) => (
                    <Link
                        href={`/playlist/${recent._id}`}
                        key={recent._id}
                        passHref={true}
                    >
                        <PlainLink>
                            <PlaylistItem {...recent} />
                        </PlainLink>
                    </Link>
                ))
            ) : (
                <List />
            )}
            <Link href="/new">
                <a>
                    <Fab>
                        내 플리 공유하기
                        <LoadSVG
                            alt="플레이리스트 업로드 아이콘"
                            src="/icons/playlist.svg"
                            height={5}
                            width={5}
                        />
                    </Fab>
                </a>
            </Link>
        </Vexile>
    )
}
