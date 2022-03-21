import React, { FC, ReactChild } from 'react'
import styled from 'styled-components'

import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
    children: ReactChild
}

const SiteLayout = styled.div`
    max-width: 1280px;
    margin: 20px auto;
    background-color: #fff;
    padding: 15px;
    height: -webkit-fill-available;
    display: flex;
    flex-direction: column;    
`

const Main = styled.main`
  overflow: auto;
  flex: 1;
`

const Layout: FC<LayoutProps> = ({ children }) => (
  <SiteLayout>
    <Main>
      {children}
    </Main>
  </SiteLayout>
)

export default Layout
