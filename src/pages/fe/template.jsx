import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../../components/layout"
const template = () => {
  return (
    <Layout location={"/fe/teams"} title={"tinyhhj blog"}>
      <Helmet>
        <link href="/fe/teams/style.css" rel="stylesheet" />
      </Helmet>
    </Layout>
  )
}

export default template
