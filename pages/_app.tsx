import { Vexile } from 'components/flexy';
import { AppProps } from 'next/app';
import Image from 'next/image'
import { globalCss, styled } from 'stitches.config';

const LogoWapper = styled('div', {
  width: "30rem",
  height: "6rem",
  position: "relative",
})

function MyApp({ Component, pageProps }: AppProps
) {
  globalCss({
    html: {
      fontSize: "4px"
    },
    body: {
      margin: "0px",
      fontSize: '4rem'
    }
  })()

  return <Vexile padding={6} gap={6}>
    <LogoWapper>
      <Image src="/logo.svg" layout="fill" />
    </LogoWapper>
    <Component />
  </Vexile>
}

export default MyApp;
