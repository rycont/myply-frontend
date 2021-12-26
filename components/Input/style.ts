import { Hexile } from "components";
import { styled } from "stitches.config";

export const Wrapper = styled(Hexile, {
    paddingLeft: "5rem",
    backgroundColor: "#F4F4F4",
    borderRadius: "2rem"
})

export const LogicalInput = styled("input", {
    display: "block",
    width: "100%",
    border: "none",
    padding: "4rem 5rem 4rem 0rem",
    backgroundColor: "transparent",
    fontSize: "4rem",
    fontFamily: "KoddiUD OnGothic",
    "&::placeholder": {
        color: "black"
    }
})
