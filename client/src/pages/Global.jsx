import React, { useEffect, useState } from "react";
import ArticlePost from "../components/ArticlePost";
// import Fade from "react-reveal/Fade";

const Global = () => {
  const [res, setRes] = useState([]);
  const getGlobalNews = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://hacknich.pythonanywhere.com/login/newsapi/?category=business&global=1",
      // "https://newsapi.org/v2/top-headlines?country=us&apiKey=b8349d72c3af4707bad08b3a55b6afa0",
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
        <h1>Global</h1>
        <p>Keep yourself updated with international news feed</p>
      </center>
      <section className="section testimonials overflow-hidden bg-black">
        {/* <Fade bottom cascade> */}
          <div className="container">
            <div className="row position-relative">
              {res.map((item) => (
                <ArticlePost
                  headline={item.title}
                  creator={item.author}
                  desc={item.description}
                  img={item.urlToImage}
                />
              ))}
            </div>
          </div>
        {/* </Fade> */}
      </section>
    </div>
  );
};

export default Global;
