import React, { useEffect, useContext, useState } from "react";
import { Container, Card } from "react-bootstrap";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import eShopentry from "../assets/eShopentry.jpg";
import { IoStarOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
///https://s3.amazonaws.com/mobileappdaily/mad/uploads/img_best_shopping_apps.jpg

function Home() {
  const [user] = useContext(UserContext);
  const [trendProducts, setTrendProd] = useState([]);

  useEffect(() => {
    FetchProducts();
  }, []);

  async function FetchProducts() {
    const rowdata = await fetch("https://fakestoreapi.com/products");
    if (rowdata) {
      const data = await rowdata.json();

      // let tin = [],
      //   tArr = [];

      // while (tin.length <= 6) {
      //   let tn = Math.floor(Math.random() * 20);

      //   if (!tin.includes(tn)) {
      //     tin.push(tn);
      //   }
      // }

      // for (let i = 0; i < 6; i++) {
      //   tArr.push(data[tin[i]]);
      // }

      //setTrendProd(tArr)

      setTrendProd([data[2], data[13], data[11], data[18], data[5], data[1]]);
    }

    console.log();
  }

  return (
    <AdditionCSS>
      <Container className="home-cnt d-flex justify-content-around rounded-3">
        <div className="my-auto">
          <h1 className="d-flex  ">
            Welcome to <span className="text-primary">&nbsp;e</span>Shop ,
            <span className="text-primary text-capitalize d-inline">
              &nbsp;{user.name}
            </span>
            .
          </h1>
          <p className="text-small fw-medium mt-3">
            <span className="text-primary">e</span>Shop provides great
            experience in product buying and at great price also.
          </p>
        </div>
        <Card className="w-50 h-auto my-auto rounded-3 bdr">
          <Card.Img className="rounded-3" src={eShopentry}></Card.Img>
          <Card.Body>
            <Card.Title className="text-mid-large fw-medium text-esec">
              Shop now and get amazing discount.
            </Card.Title>
            <Card.Text className="text-mid-small fw-medium">
              Check out our new deals & trending items below.
              <span className="text-esec">&nbsp;Happy eShopping</span>.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>

      {/* Trending Section */}

      <Container>
        <div className="row mt-5">
          {trendProducts.map((product) => {
            return (
              <Card key={product.id} className="m-5 h-auto col-3 cst">
                <Card.Text className="fw-medium m-2 ">
                  {product.category}
                </Card.Text>
                <Card.Img className="m-3 w-75 " src={product.image}></Card.Img>
                <Card.Body>
                  <Card.Title className="text-mid fw-medium text-primary">
                    {product.title}{" "}
                    <h3 className="text-success mt-2 d-flex justify-content-between ">
                      <span>
                        {product.rating.rate}&nbsp;
                        <IoStarOutline className="mb-2 text-mid-small" />
                      </span>
                      <p className="text-small text-dark mt-2">
                        {product.rating.count} ratings
                      </p>
                    </h3>
                  </Card.Title>
                  <Card.Text className="text-mid fw-medium mt-3 ms-3">
                    <h2 className="d-flex align-items-center justify-content-start">
                      <span>{product.price}</span>
                      <BsCurrencyDollar />
                      <span className="text-mid-small text-danger  prev-p d-flex align-items-center ms-2 ">
                        {PrevPrice(product.price)}
                        <BsCurrencyDollar />
                      </span>
                      <span className="text-success text-mid-small">
                        25% off.
                      </span>
                    </h2>
                    <h5 className="mt-3 d-block text-truncate ">
                      {product.description}
                    </h5>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    </AdditionCSS>
  );
}

function PrevPrice(p) {
  return (p + p * 0.25).toFixed(2);
}

const AdditionCSS = styled.div`
  .home-cnt {
    height: 60vh;
    margin-top: 8rem;
    border-top: 3px solid #2e6cde;
    border-bottom: 3px solid #2e6cde;
  }

  .text-large {
    font-size: 2.25rem;
  }

  .text-mid-large {
    font-size: 2rem;
  }

  .text-mid {
    font-size: 1.5rem;
  }

  .text-mid-small {
    font-size: 1.2rem;
  }

  .text-small {
    font-size: 1rem;
  }

  .text-esec {
    color: #5680cc; // #2d4a8e; // ; //#6892de; // #7ba2e7; // #1875bb; //#5b68ce; // #4a9074; // #46dbc8; //#2596be;
  }
  .bdr {
    border: none; // 1px solid #5680cc;
    width: 90%;
    max-width: 40rem;
  }

  .cst {
    border: none;
    border-top: 2px solid rgb(46, 108, 222);
    border-right: 2px solid #2e6cde;
    transition: 0.3s ease-in-out;
    .prev-p {
      text-decoration: line-through;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export default Home;

// .text-small {
//   font-size: 1rem;
//   @media (max-width: 768px) {
//     font-size: 0.4rem;
//   }
// }