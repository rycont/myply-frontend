import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { fetchPlaylist } from "process/fetchPlaylist"
import { Playlist, Song } from "myply-common"
import React, { useEffect } from "react"
import { initDatabase, playlistDatabase, songDatabase } from "database"
import { Doc } from "types"
import { useRecoilState } from "recoil"
import { modalContentAtom } from "coil"

export const FetchURIPage: NextPage<{
    name: string
    tracks: Song[]
    createdId: string
}> = (props) => {
    const setModal = useRecoilState(modalContentAtom)[1]
    const router = useRouter()

    useEffect(() => {
        setModal(null)
        router.push(`/playlist/${props.createdId}`)
    }, [props.createdId, router, setModal])

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
                ...(preGenerated as Omit<Song, "channelIds"> & {
                    channelIds: string
                } & { _id: string }),
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
            ...(preGenerated as Omit<Song, "channelIds"> & {
                channelIds: string
            } & { _id: string }),
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

    const merged = await Promise.all(
        fetched.tracks.slice(0, 25).map(mergeWithDatabase)
    )

    console.log("Songs Created")

    const createdId = await playlistDatabase.create({
        ...fetched,
        tracks: {
            type: "Relation",
            target: merged
                .map((e) => ({
                    ...e,
                    channelIds: JSON.stringify(e.channelIds),
                }))
                .map((e) => e._id),
        },
        preGenerated: JSON.stringify(fetched.preGenerated),
    })

    if (createdId)
        return {
            redirect: `/playlist/${createdId}`,
            props: {
                createdId,
            },
        }

    return {
        props: {},
    }
}

export default FetchURIPage
