import React, { useEffect, useState } from "react";
import NewsTemplate from "./components/NewsTemplate";
// import styled from "styled-components";

function App() {
  const [news, setNews] = useState();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    let data = await fetch(
      "https://newsapi.org/v2/everything?q=bitcoin&apiKey=a65f25b156db45fe98b5db96e85ce606"
    );

    if (data) {
      const temp = await data.json();
      const arts = temp.articles;
      setNews(arts);
    }
  };

  return (
    <>
      <h1 className="m-3">API News</h1>
      <div className="p-3 ">
        {news?.map((art) => {
          return <NewsTemplate key={art.title} art={art} />;
        })}
      </div>
    </>
  );
}

export default App;
