import { Vexile } from "@haechi/flexile"
import { ModalPlaceholder } from "components"
import { AppProps } from "next/app"
import Image from "next/image"
import Link from "next/link"
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
            fontSize: "5px",
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
                <Link href="/">
                    <a>
                        <LogoWapper>
                            <Image src="/logo.svg" layout="fill" />
                        </LogoWapper>
                    </a>
                </Link>
                <Component {...pageProps} />
            </Vexile>
        </RecoilRoot>
    )
}

export default MyApp
