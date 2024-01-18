import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Card } from "react-bootstrap";
import { IoStarOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Products() {
  const [category, setCategory] = useState("");
  const [products, setProds] = useState([]);
  const themeColor = useSelector((state) => {
    return state.themeReducer.thColor;
  });

  async function FetchProducts(c) {
    try {
      const data = await axios.get(`http://localhost:8000/api/products/${c}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("eshop-user-token")}`
        }
      });

      if (data) {
        setProds(data.data);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("eshop-user-token")) {
      FetchProducts(category);
    }
  }, [category]);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const searchProducts = (e) => {
    const filter = e.target.value.toLowerCase();
    const divs = document.getElementsByClassName("cst");

    for (let i = 0; i < divs.length; i++) {
      const textCnt = divs[i].textContent || divs[i].innerText;

      if (textCnt.toLowerCase().indexOf(filter) > -1) {
        divs[i].style.display = "";
      } else {
        divs[i].style.display = "none";
      }
    }
  };

  const delaySearch = (callback, ms) => {
    let timer = 0;
    return () => {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback.apply(context, args);
      }, ms || 0);
    };
  };

  function PrevPrice(p) {
    return (p + p * 0.25).toFixed(2);
  }

  return (
    <AdditionCSS>
      <Container className="header d-flex justify-content-around align-items-center">
        <select
          className={
            "form-select w-25 bg-" +
            (themeColor === "light" ? "white" : "dark") +
            " text-" +
            (themeColor === "light" ? "black" : "light")
          }
          aria-label="Default select example"
          onChange={(e) => handleChange(e)}
        >
          <option value="" selected>
            Category : All{" "}
          </option>
          <option disabled>------------------------------</option>
          <option value="category/electronics">Electronics</option>
          <option value="category/women's clothing">
            Women&apos;s clothing
          </option>
          <option value="category/jewelery">Jewelery</option>
          <option value="category/men's clothing">Men&apos;s clothing</option>
        </select>
        <div className="">
          <input
            className={
              "search-box text-mid-small bg-" +
              (themeColor === "light" ? "white" : "dark") +
              " text-" +
              (themeColor === "light" ? "black" : "white")
            }
            type="text"
            placeholder="Search Products"
            aria-label="Search"
            onKeyUp={delaySearch(searchProducts, 500)}
          />
          <FaSearch
            className={
              "text-mid text-" +
              (themeColor === "light" ? "black" : "secondary")
            }
          />
        </div>
      </Container>
      <Container className="home-cnt rounded-3 my-5">
        <div className="row mt-5">
          {products.map((product) => {
            return (
              <Card
                key={product.id}
                className={
                  "m-5 h-auto col-3 cst bg-" +
                  (themeColor === "light" ? "white" : "dark")
                }
              >
                <Card.Text
                  className={
                    "fw-medium m-2 text-" +
                    (themeColor === "light" ? "dark" : "secondary")
                  }
                >
                  {product.category}
                </Card.Text>
                <Card.Img className="m-3 w-75 " src={product.imageUrl} />
                <Card.Body>
                  <Card.Title className="text-mid fw-medium text-primary">
                    {product.title}{" "}
                    <h3 className="text-success mt-2 d-flex justify-content-between ">
                      <span>
                        {product.rating}&nbsp;
                        <IoStarOutline className="mb-2 text-mid-small" />
                      </span>
                      <p
                        className={
                          "text-small mt-2 text-" +
                          (themeColor === "light" ? "dark" : "secondary")
                        }
                      >
                        {product.ratingCount} ratings
                      </p>
                    </h3>
                  </Card.Title>
                  <Card.Title className="text-mid fw-medium mt-3 ms-3">
                    <h2 className="d-flex align-items-center justify-content-start">
                      <span
                        className={
                          "d-flex align-items-center text-" +
                          (themeColor === "light" ? "dark" : "light")
                        }
                      >
                        {product.price}
                        <BsCurrencyDollar />
                      </span>

                      <span className="text-mid-small text-danger  prev-p d-flex align-items-center ms-2 ">
                        {PrevPrice(product.price)}
                        <BsCurrencyDollar />
                      </span>
                      <span className="text-success text-mid-small">
                        25% off.
                      </span>
                    </h2>
                    <h5
                      className={
                        "mt-3 d-block text-truncate text-" +
                        (themeColor === "light" ? "dark" : "secondary")
                      }
                    >
                      {product.description}
                    </h5>
                  </Card.Title>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
      <Toaster />
    </AdditionCSS>
  );
}

const AdditionCSS = styled.div`
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

  .header {
    margin-top: 8rem;
  }
  .home-cnt {
    border-top: 3px solid #2e6cde;
    border-bottom: 3px solid #2e6cde;
  }

  .search-box {
    border: none;
    outline: none;
    border-bottom: 2px solid #2e6cde;
    transition: 0.15s ease-in-out;
    &:hover {
      font-size: 1.6rem;
    }
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

export default Products;
