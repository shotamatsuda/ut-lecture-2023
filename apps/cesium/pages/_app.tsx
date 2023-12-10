import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'

import './styles.css'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>U-Tokyo Lecture 2023 / Cesium</title>
    </Head>
    <Component {...pageProps} />
  </>
)

export default App
