import { modalContentAtom } from "coil"
import { Button, GDesc, Header, Hexile, Input, Vexile, XDesc } from "components"
import { initDatabase, playlistDatabase } from "database"
import { Playlist, Song } from "myply-common"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { SongItem } from "./partial"

export const NewPlaylist: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
    return (
        <Vexile gap={9}>
            <Vexile gap={1}>
                <Header>{playlist.name}</Header>
                <XDesc>{playlist.tracks.length}개 곡</XDesc>
            </Vexile>
            <Vexile gap={5}>
                {playlist.tracks.map((song) => (
                    <SongItem song={song} />
                ))}
            </Vexile>
        </Vexile>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    await initDatabase()
    if (!params) return { props: {} }
    const playlist = await playlistDatabase.findById<{
        tracks: Song[]
    }>(params.id as string, ["tracks"])

    console.log(playlist)

    return {
        props: {
            playlist,
        },
    }
}

export default NewPlaylist
