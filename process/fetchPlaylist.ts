import { providers } from "constant"

export const determineProvider = (uri: string) => {
    return providers.find((e) =>
        e.determinator.some((determinator) => uri.includes(determinator))
    )
}

export const fetchPlaylist = (uri: string) => {
    const provider = determineProvider(uri)
    if (!provider) throw new Error("CANNOT_RECOG_PROVIDER")

    return provider.getPlaylistContent(uri)
}
