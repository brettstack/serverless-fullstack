import React from 'react'
import {
  Image,
  Layout,
} from 'antd'
import Link from 'next/link'
import BaseLayout from './BaseLayout'
import SideMenu from './SideMenu'
import { useMeQuery, useCurrentUserQuery } from '../../lib/me'
import theme from '../../themes/base'

const Logo = React.forwardRef(({ onClick, href }, ref) => (
  <a href={href} onClick={onClick} ref={ref}>
    <Image
      className="logo"
      src="/logo.png"
      alt="logo"
      preview={false}
    />
    <style jsx global>
      {`
        a {
          display: inline-block;
        }
        .logo {
          margin-top: 8px;
          margin-left: ${theme.fontSizeBase};
          width: 110px;
        }
      `}
    </style>
  </a>
))

const AppLayout = ({ children, selectedKey, pageTitle }) => {
  const currentUserQuery = useCurrentUserQuery()
  const meQuery = useMeQuery({ isAuthenticated: Boolean(currentUserQuery.data) })

  return (
    <BaseLayout pageTitle={pageTitle}>
      <Layout className="topLayout">
        <Layout.Sider className="sider">
          <Link href="/" passHref>
            <Logo />
          </Link>
          <SideMenu selectedKey={selectedKey} />
        </Layout.Sider>
        <Layout className="siteLayout">
          <Layout.Content className="mainContent">
            {children}
          </Layout.Content>
        </Layout>
        <style jsx global>
          {`
            .topLayout {
              min-height: 100vh;
            }

            .sider {
              overflow: auto;
              height: 100vh;
              position: fixed;
              left: 0;
            }

            .siteLayout {
              margin-left: 200px;
            }

            .mainContent {
              margin: ${theme.fontSizeBase};
              overflow: initial;
            }

            .ant-breadcrumb {
              margin-bottom: ${theme.fontSizeBase};
            }
        `}
        </style>
      </Layout>
    </BaseLayout>
  )
}

export default AppLayout
