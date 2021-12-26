import { Header, Vexile } from "components"
import {
    connectDatabase,
    fetchDatabases,
    notion,
    Relation,
} from "database/notion"
import { GetServerSideProps } from "next"
import { PlaylistItem } from "./partial"

export default function Home() {
    return (
        <Vexile gap={3}>
            <Header>방금 올라온 플리</Header>
            {/* <PlaylistItem description="" /> */}
        </Vexile>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const playlistDatabase = await connectDatabase<{
        name: string
        description: string
    }>("Playlist")

    console.log(
        await playlistDatabase.get({
            sorts: [
                {
                    timestamp: "created_time",
                    direction: "ascending",
                },
            ],
        })
    )

    return {
        props: {
            // recents: await getRecentPlaylists(),
        },
    }
}
