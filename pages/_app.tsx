import { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"

import { AppWrapper, LogoWapper } from "./style"
import { ModalPlaceholder } from "components"
import { globalCss } from "stitches.config"
import "style/ongothic.css"

function MyApp({ Component, pageProps }: AppProps) {
    globalCss({
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
        <>
            <Head>
                <link rel="icon" href="/favicon.svg" />
                <title>마이플리</title>
            </Head>
            <RecoilRoot>
                <ModalPlaceholder />
                <AppWrapper
                    padding={6}
                    gap={6}
                    css={{
                        paddingBottom: "24rem",
                    }}
                >
                    <Link href="/">
                        <a>
                            <LogoWapper>
                                <Image
                                    priority
                                    src="/logo.svg"
                                    layout="fill"
                                    alt="서비스 로고"
                                />
                            </LogoWapper>
                        </a>
                    </Link>
                    <Component {...pageProps} />
                </AppWrapper>
            </RecoilRoot>
        </>
    )
}

export default MyApp
