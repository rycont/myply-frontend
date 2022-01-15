import { atom } from "recoil"
import { ModalContent } from "./components"

export const modalContentAtom = atom<ModalContent | null>({
    key: "modal_content",
    default: null,
})
