import { SpotifyAdaptor } from "providers/myply-spotify-adapter"
import { MelonAdapter } from "providers/myply-melon-adapter"

const providers = [SpotifyAdaptor, MelonAdapter]

export const determineProvider = (uri: string) => {
    return providers.find(e => e.determinator.some(determinator => uri.includes(determinator)))
}

export const fetchPlaylist = (uri: string) => {
    const provider = determineProvider(uri)
    if (!provider) throw new Error("CANNOT_RECOG_PROVIDER")

    return provider.getPlaylistContent(uri)
}
