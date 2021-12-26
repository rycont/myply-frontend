import { styled } from "stitches.config";
import { Hexile } from "./ezlay";

export const Fab = styled(Hexile, {
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    background: "$accent",
    color: "white",
    padding: "4rem 5rem",
    borderRadius: "6rem",
    position: "absolute",
    bottom: "6rem",
    left: "50%",
    transform: "translateX(-50%)",
    gap: "1rem",
    alignItems: "center",
})
