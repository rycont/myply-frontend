import axios from "axios"
import { useEffect, useState } from "react"

export const connect = async <In, Out>(uri: string, data: In): Promise<Out> => {
    return (
        await axios("/api/" + uri, {
            data,
            method: data ? "POST" : "GET",
        })
    ).data
}

export const useConnect = <In, Out>(uri: string, data: In) => {
    const [value, setValue] = useState<Out>()

    useEffect(() => {
        connect<In, Out>(uri, data)
            .then(setValue)
            .catch((e) => {
                console.log("ERR", e)
            })
    }, [uri, data])

    return value
}
