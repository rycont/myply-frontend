import { GetServerSideProps } from "next"
import { Playlist, Song } from "myply-common"
import { Fab, Header, LoadSVG, PlainLink } from "components"
import { PlaylistItem } from "./partial"
import { initDatabase, playlistDatabase } from "database"
import { Doc } from "types"
import Link from "next/link"
import { Vexile } from "@haechi/flexile"

export default function Home(props: { recents: Doc<Playlist>[] }) {
    return (
        <Vexile gap={3}>
            <Header>방금 올라온 플리</Header>
            {props.recents.map((recent) => (
                <Link
                    href={`/playlist/${recent._id}`}
                    key={recent._id}
                    passHref={true}
                >
                    <PlainLink>
                        <PlaylistItem {...recent} />
                    </PlainLink>
                </Link>
            ))}
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

export const getServerSideProps: GetServerSideProps = async () => {
    await initDatabase()
    const recents = await playlistDatabase.get<{
        tracks: Song[]
    }>(
        {
            sorts: [
                {
                    timestamp: "created_time",
                    direction: "ascending",
                },
            ],
        },
        ["tracks"]
    )

    return {
        props: {
            recents,
        },
    }
}
