import styled from '@emotion/styled'
import { NextPage } from 'next'

import { Main } from '../components/Main'

const Root = styled.div`
  width: 100%;
  height: 100%;
`

const Index: NextPage = () => (
  <Root>
    <Main />
  </Root>
)

export default Index
