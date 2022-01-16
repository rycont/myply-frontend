import { Vexile } from "@haechi/flexile"
import { styled } from "stitches.config"

export const ModalBackdrop = styled(Vexile, {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "fixed",
    zIndex: 1,
    padding: "6rem",
})

export const ModalWrapper = styled(Vexile, {
    accentShadow: true,
    accentBorder: true,
    backgroundColor: "white",
    borderRadius: "3rem",
})
