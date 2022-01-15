import { Hexile } from "@haechi/flexile"
import { styled } from "stitches.config"

export const Fab = styled(Hexile, {
    boxShadow: "0px 1rem 3rem rgba(0, 0, 0, 0.2)",
    background: "$accent",
    color: "white",
    padding: "4rem 5rem",
    borderRadius: "6rem",
    position: "fixed",
    bottom: "6rem",
    left: "50%",
    transform: "translateX(-50%)",
    gap: "1rem",
    alignItems: "center",
    width: "fit-content",
})

export const Button = styled(Hexile, {
    background: "$accent",
    color: "white",
    padding: "2rem 5rem",
    borderRadius: "6rem",
    gap: "1rem",
    alignItems: "center",
})
