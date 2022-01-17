import { Vexile } from "@haechi/flexile"
import { keyframes, styled } from "stitches.config"

const appear = keyframes({
    "0%": { transform: "translateY(100%)" },
    "100%": { transform: "translateY(0%)" },
})

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
    animation: `${appear} 200ms`,
})

export const ProviderItemWrapper = styled(Vexile, {
    borderRadius: "3rem",
})

export const FixedSizeItem = styled("div", {
    maxHeight: "8rem",
    width: "10rem",
    "&>svg": {
        height: "fit-content",
        width: "fit-content",
        maxHeight: "100%",
        maxWidth: "100%",
    },
})
