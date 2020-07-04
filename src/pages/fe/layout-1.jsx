import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../../components/layout"
export const Layout1 = () => {
  return (
    <Layout location={"/fe/teams"} title={"tinyhhj blog"}>
      <Helmet>
        <link href="/fe/layout-1.css" rel="stylesheet" />
      </Helmet>
      <div className="container">
        <div className="cover">
          <img src="https://picsum.photos/800/1200"></img>
        </div>
        <div className="content">
          <span>Artist</span>
          <h1>Jane doe</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only
          </p>
        </div>
      </div>

      <div className="profile">
        <div className="header">hello blue joy</div>
        <div className="contents">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only
          </p>
        </div>
      </div>
      <h3>reference</h3>
      <p>
        <a href="https://www.youtube.com/watch?v=tcX9QuRYPgw">
          CSS 간단한 반응형 레이아웃 만들기 | EP6 | 바이트 사이즈 | IE9+ |
          빔캠프
        </a>
      </p>
    </Layout>
  )
}

export default Layout1
