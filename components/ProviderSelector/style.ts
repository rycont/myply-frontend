import { Vexile } from "@haechi/flexile"
import { styled } from "stitches.config"

export const Backdrop = styled(Vexile, {
    position: "fixed",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    left: "0rem",
    top: "0rem",
})

export const PanelWrapper = styled(Vexile, {
    backgroundColor: "white",
    borderTopLeftRadius: "6rem",
    borderTopRightRadius: "6rem",
})

export const ProviderItemWrapper = styled(Vexile, {
    borderRadius: "3rem",
})

export const FixedSizeItem = styled("div", { height: "10rem", width: "10rem" })
