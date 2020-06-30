import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../../components/layout"

export default () => {
  return (
    <>
      <Layout location={"/fe/teams"} title={"tinyhhj blog"}>
        <Helmet>
          <link href="/fe/teams/style.css" rel="stylesheet" />
        </Helmet>
        <div className="wrapper">
          <ul className="team">
            <li className="team-item">
              <img
                alt="test-img"
                src="/fe/teams/hin-bong-yeung-jF946mh5QrA-unsplash.jpg"
              />
              <div className="profile profile_red">
                <h2>
                  photo by <span>hin-bong-yeung</span>
                </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </li>
            <li className="team-item">
              <img
                alt="test-img"
                src="/fe/teams/matteo-catanese-PI8Hk-3ZcCU-unsplash.jpg"
              />
              <div className="profile profile_beige">
                <h2>
                  photo by <span>matteo-catanese</span>
                </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </li>
            <li className="team-item">
              <img
                alt="test-img"
                src="/fe/teams/omid-armin-2GHCdtW45Uw-unsplash.jpg"
              />
              <div className="profile profile_green">
                <h2>
                  photo by <span>omid-armin</span>
                </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </li>
            <li className="team-item">
              <img
                alt="test-img"
                src="/fe/teams/ryoji-iwata-X53e51WfjlE-unsplash.jpg"
              />
              <div className="profile profile_purple">
                <h2>
                  photo by <span>ryoji-iwata</span>
                </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </li>
            <li className="team-item">
              <img
                alt="test-img"
                src="/fe/teams/yeshi-kangrang-PM_VwL2ypes-unsplash.jpg"
              />
              <div className="profile profile_pink">
                <h2>
                  photo by <span>yeshi-kangrang</span>
                </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </li>
          </ul>
          <h3>reference</h3>
          <p>
            <a href="https://www.youtube.com/watch?v=rF0h1SA6zZw">
              youtube 강의
            </a>
          </p>
          <p>
            <span>
              Photo by{" "}
              <a href="https://unsplash.com/@hinbong?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                Hin Bong Yeung
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/s/photos/urban?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                Unsplash
              </a>
            </span>
          </p>
          <p>
            <span>
              Photo by{" "}
              <a href="https://unsplash.com/@omgitsyeshi?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                Yeshi Kangrang
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/s/photos/urban?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                Unsplash
              </a>
            </span>
          </p>
          <p>
            <span>
              Photo by{" "}
              <a href="https://unsplash.com/@omidarmin?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                Omid Armin
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/s/photos/urban?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                Unsplash
              </a>
            </span>
          </p>
          <p>
            <span>
              Photo by{" "}
              <a href="https://unsplash.com/@ryoji__iwata?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                Ryoji Iwata
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/s/photos/urban?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                Unsplash
              </a>
            </span>
          </p>
          <p>
            <span>
              Photo by{" "}
              <a href="https://unsplash.com/@matteocatanese?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                Matteo Catanese
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/s/photos/urban?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                Unsplash
              </a>
            </span>
          </p>
        </div>
      </Layout>
    </>
  )
}
