import { Hexile } from "@haechi/flexile"
import { GDesc, Redirector } from "components"
import { styled } from "stitches.config"

export const CopyArea = styled(Hexile, {
    backgroundColor: "#F4F4F4",
    padding: "3rem 4rem",
    borderRadius: "2rem",
})

export const CopyUrl = styled(GDesc, {
    opacity: 1,
    whiteSpace: "nowrap",
    overflowX: "scroll",
})

export default Redirector
