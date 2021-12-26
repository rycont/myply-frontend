import { Header, Vexile } from "components"
import {
    connectDatabase,
    fetchDatabases,
    notion,
    Relation,
} from "database/notion"
import { GetServerSideProps } from "next"
import { Playlist, Song } from "myply-common"
import { PlaylistItem } from "./partial"

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
    const playlistDatabase = await connectDatabase<
        Omit<Playlist, "tracks"> & {
            tracks: Relation
        }
    >("Playlist")

    return {
        props: {
            recents: await playlistDatabase.get<{
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
            ),
        },
    }
}
