import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { fetchPlaylist } from "process/fetchPlaylist"
import { Playlist, Song } from "myply-common"
import React from "react"
import {
    initDatabase,
    playlistDatabase,
    Relation,
    songDatabase,
} from "database"
import { Doc } from "types"

export const FetchURIPage: NextPage<{
    fetched: Playlist[]
}> = (props) => {
    const router = useRouter()

    return <></>
}

async function mergeWithDatabase(song: Song): Promise<Doc<Song>> {
    const [preGenerated] = await songDatabase.get({
        filter: {
            and: [
                {
                    property: "name",
                    text: {
                        equals: song.name,
                    },
                },
                {
                    property: "artist",
                    text: {
                        equals: song.artist,
                    },
                },
            ],
        },
    })

    if (preGenerated) {
        const channelIds = JSON.parse(preGenerated.channelIds) as Record<
            string,
            string
        >
        if (channelIds[Object.keys(song.channelIds)[0]])
            return {
                ...preGenerated,
                channelIds: JSON.parse(preGenerated.channelIds) as Record<
                    string,
                    string
                >,
            }

        await songDatabase.update(preGenerated._id, {
            channelIds: JSON.stringify({
                ...channelIds,
                ...song.channelIds,
            }),
        })

        return {
            ...preGenerated,
            channelIds: {
                ...channelIds,
                ...song.channelIds,
            },
        }
    }

    const createdId = await songDatabase.create({
        ...song,
        channelIds: JSON.stringify(song.channelIds),
    })

    return { ...song, _id: createdId }
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    await initDatabase()

    const fetched = (await fetchPlaylist(
        query.playlistURI as string
    )) as Playlist

    const merged: Doc<
        Omit<Song, "channelIds"> & {
            channelIds: string
        }
    >[] = (await Promise.all(fetched.tracks.map(mergeWithDatabase))).map(
        (e) => ({
            ...e,
            channelIds: JSON.stringify(e.channelIds),
        })
    )

    console.log("Songs Created")

    await playlistDatabase.create({
        name: "테스트테스트",
        tracks: {
            type: "Relation",
            target: merged.map((e) => e._id),
        },
    })

    return { props: { fetched: merged } }
}

export default FetchURIPage
