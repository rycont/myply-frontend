import { styled } from "stitches.config"
import { Property } from "@stitches/react/types/css"

const typoGenerator = (
    fontSize: number,
    fontWeight: Property.FontWeight,
    lineHeight?: number,
    opacity: number = 1
) =>
    styled("p", {
        fontSize: fontSize + "rem",
        fontWeight,
        margin: 0,
        lineHeight: lineHeight + "rem",
        opacity,
        variants: {
            accent: {
                true: {
                    color: "$accent",
                },
            },
            strike: {
                true: {
                    textDecoration: "line-through",
                },
            },
            notight: {
                true: {
                    letterSpacing: "0em",
                },
            },
            center: {
                true: {
                    textAlign: "center",
                },
            },
        },
    })

export const Header = typoGenerator(5, 800)
export const XDesc = typoGenerator(4, 400, undefined, 0.4)
export const SectionHeader = typoGenerator(4.5, 700)
export const Regular = typoGenerator(4, 400)
export const Readable = typoGenerator(3.5, 400, undefined, 0.7)
export const IRegular = typoGenerator(4, 700)
export const GDesc = typoGenerator(3.5, 400, undefined, 0.4)
export const IDesc = typoGenerator(3.5, 400)
