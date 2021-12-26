import { GetServerSideProps } from "next"
import { Playlist, Song } from "myply-common"
import { Header, Vexile } from "components"
import { PlaylistItem } from "./partial"
import { playlistDatabase } from "database"

export default function Home(props: { recents: Playlist[] }) {
    return (
        <Vexile gap={3}>
            <Header>방금 올라온 플리</Header>
            {props.recents.map((recent) => (
                <PlaylistItem {...recent} onClick={console.log} />
            ))}
        </Vexile>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
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
