import { Vexile } from "@haechi/flexile"
import { styled } from "stitches.config"
import Redirector from "./partial"

export const LogoWapper = styled("div", {
    maxWidth: "30rem",
    minHeight: "6rem",
    position: "relative",
})

export const AppWrapper = styled(Vexile, {
    maxWidth: "620px",
    position: "relative",
    margin: "0 auto",
})

export default Redirector
