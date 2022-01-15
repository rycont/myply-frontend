import { Adaptor } from "myply-common"
import { MelonAdapter } from "packages/myply-melon-adapter"
import { SpotifyAdaptor } from "packages/myply-spotify-adapter"

export const providers: Adaptor[] = [SpotifyAdaptor, MelonAdapter]
