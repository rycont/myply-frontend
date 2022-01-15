import { ModalPlaceholder } from "components"
import { Vexile } from "components/ezlay"
import { AppProps } from "next/app"
import Image from "next/image"
import { RecoilRoot } from "recoil"
import { globalCss, styled } from "stitches.config"

const LogoWapper = styled("div", {
    width: "30rem",
    minHeight: "6rem",
    position: "relative",
})

function MyApp({ Component, pageProps }: AppProps) {
    globalCss({
        "@import": ["/ongothic/index.css"],
        html: {
            fontSize: "6px",
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
        <RecoilRoot>
            <ModalPlaceholder />
            <Vexile padding={6} gap={6} filly>
                <LogoWapper>
                    <Image src="/logo.svg" layout="fill" />
                </LogoWapper>
                <Component {...pageProps} />
            </Vexile>
        </RecoilRoot>
    )
}

export default MyApp
