import React, { useState, useEffect } from "react";
import ArticlePost from "../components/ArticlePost";
// import Fade from "react-reveal/Fade";

const Local = () => {
  const [res, setRes] = useState([]);
  const getGlobalNews = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://hacknich.pythonanywhere.com/login/newsapi/?category=business&local=1",
      // "https://api.markets.sh/api/v1/clusters/800e5c32-4aaf-47aa-a281-fdd0dfed6c4f?api_token=3e9c1b879233e9dc910f5aeec2a87ef7",
      requestOptions
    ) 
      .then((response) => response.json())
      .then((result) => {
        setRes(result);
        return console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getGlobalNews();
  }, []);

  return (
    <div>
      <center>
        <h1>Local</h1>
        <p>Your personalized local feed</p>
      </center>
      <section className="section testimonials overflow-hidden bg-black">
        {/* <Fade bottom cascade> */}
          <div className="container">
            <div className="row position-relative">
              {res.map((item) => (
                <ArticlePost
                  headline={item.topic_class}
                  creator={item.description}
                  desc={item.teaser}
                  img={item.created_at}
                />
              ))}
            </div>
          </div>
        {/* </Fade> */}
      </section>
    </div>
  );
};

export default Local;
