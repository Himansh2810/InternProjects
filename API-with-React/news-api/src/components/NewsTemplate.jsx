import React from "react";
import styled from "styled-components";

function NewsTemplate({ art }) {
  return (
    <Container className="m-5 rounded-3">
      <div className="d-flex mt-2 ">
        <img
          className="m-3 w-50 rounded-3 col-sm"
          src={art.urlToImage}
          alt="Random news"
        />
        <div className="m-3 p-3">
          <p className="text-large fw-bolder text-primary">{art.source.name}</p>
          <p className="text-mid-large fw-medium  m-3">{art.title}</p>
          <p className="text-mid m-3 mt-5 fw-medium">By : {art.author}</p>
          <p className="text-mid m-3 mt-5 fw-medium ">On : {art.publishedAt}</p>
        </div>
      </div>
      <div className="m-3">
        <h1>Description</h1>
        <div className="text-mid m-2 fw-light">{art.description}</div>
        <h2>Main Talk</h2>
        <div className="text-mid m-2 fw-light">{art.content}</div>
        <h2>
          Read full article <a href={art.url}>here</a>.
        </h2>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border-top: 5px solid rgb(70, 129, 238);
  .text-large {
    font-size: 3rem;
  }

  .text-mid-large {
    font-size: 2.25rem;
  }

  .text-mid {
    font-size: 1.5rem;
  }
`;

export default NewsTemplate;
