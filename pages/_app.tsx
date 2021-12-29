import { Vexile } from "components/ezlay"
import { AppProps } from "next/app"
import Image from "next/image"
import { globalCss, styled } from "stitches.config"

const LogoWapper = styled("div", {
    width: "30rem",
    height: "6rem",
    position: "relative",
})

function MyApp({ Component, pageProps }: AppProps) {
    globalCss({
        "@import": ["/ongothic/index.css"],
        html: {
            fontSize: "4px",
            fontFamily: "KoddiUD OnGothic",
        },
        body: {
            margin: "0px",
            fontSize: "4rem",
        },
        "#__next": {
            height: "100vh",
        },
    })()

    return (
        <div style={{ padding: "6rem" }}>
            <LogoWapper>
                <Image src="/logo.svg" layout="fill" />
            </LogoWapper>
            <div style={{ height: "9rem" }}></div>
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
