import { providers } from "constant"
import { CommonError } from "error"

export const determineProvider = (uri: string) => {
    return providers.find((e) =>
        e.determinator.some((determinator) => uri.includes(determinator))
    )
}

export const fetchPlaylist = (uri: string) => {
    const provider = determineProvider(uri)
    if (!provider) throw new CommonError("CANNOT_RECOG_PROVIDER")

    return provider.getPlaylistContent(uri)
}
