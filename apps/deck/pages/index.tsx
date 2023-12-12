import styled from '@emotion/styled'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Main = dynamic(async () => (await import('../src/Main')).Main, {
  ssr: false
})

const Root = styled.div``

const Index: NextPage = () => (
  <Root>
    <Suspense>
      <Main />
    </Suspense>
  </Root>
)

export default Index
