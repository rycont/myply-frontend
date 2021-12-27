import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { fetchPlaylist } from "process/fetchPlaylist"
import React from "react"

export const FetchURIPage: NextPage = (props) => {
    const router = useRouter()

    return <>{router.query.playlistURI}</>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    console.log(await fetchPlaylist(query.playlistURI as string))
    return {
        props: {},
    }
}

export default FetchURIPage
