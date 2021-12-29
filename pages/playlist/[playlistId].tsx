import { Header, Hexile, IRegular, LoadSVG, Vexile, XDesc } from "components"
import { initDatabase, playlistDatabase } from "database"
import { Playlist, Song } from "myply-common"
import { GetServerSideProps, NextPage } from "next"
import { SongItem } from "./partial"

export const PlaylistPage: NextPage<{
    playlist: Playlist
}> = ({ playlist }) => {
    return (
        <Vexile gap={9}>
            <Vexile gap={4}>
                <Vexile gap={1}>
                    <Header>{playlist.name}</Header>
                    <XDesc>{playlist.tracks.length}곡</XDesc>
                </Vexile>
                <Hexile gap={3}>
                    <Hexile gap={0.5}>
                        <LoadSVG width={5} height={5} src="/icons/share.svg" />
                        <IRegular accent>공유</IRegular>
                    </Hexile>
                </Hexile>
            </Vexile>

            <Vexile gap={4}>
                {playlist.tracks.map((track, i) => (
                    <SongItem
                        {...track}
                        index={i}
                        key={JSON.stringify(track.channelIds)}
                    />
                ))}
            </Vexile>
        </Vexile>
    )
}

export const getServerSideProps: GetServerSideProps = async (req) => {
    await initDatabase()

    const pid = req.query.playlistId as string
    const fetched = await playlistDatabase.findById<{
        tracks: (Song & { channelIds: string })[]
    }>(pid, ["tracks"])

    return {
        props: {
            playlist: {
                ...fetched,
                tracks: fetched.tracks.map((e) => ({
                    ...e,
                    channelIds: JSON.parse(e.channelIds),
                })),
            },
        },
    }
}

export default PlaylistPage
