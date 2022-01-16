import { Adaptor } from "myply-common"
import { GenieAdapter } from "packages/myply-genie-adapter"
import { MelonAdapter } from "packages/myply-melon-adapter"
import { SpotifyAdaptor } from "packages/myply-spotify-adapter"

export const providers: Adaptor[] = [SpotifyAdaptor, MelonAdapter, GenieAdapter]
