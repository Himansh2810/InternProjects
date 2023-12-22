import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Card } from "react-bootstrap";
import { IoStarOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

function Products() {
  const [category, setCategory] = useState("");
  const [products, setProds] = useState([]);

  useEffect(() => {
    FetchProducts(category);
  }, [category]);

  async function FetchProducts(c) {
    const rowdata = await fetch(`https://fakestoreapi.com/products/${c}`);
    if (rowdata) {
      const data = await rowdata.json();
      setProds(data);
    }
  }

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <AdditionCSS>
      <Container className="header d-flex justify-content-around align-items-center">
        <select
          className="form-select w-25"
          aria-label="Default select example"
          onChange={(e) => handleChange(e)}
        >
          <option value="" selected>
            Category : All{" "}
          </option>
          <option disabled>------------------------------</option>
          <option value="category/electronics">Electronics</option>
          <option value="category/women's clothing">Women's clothing</option>
          <option value="category/jewelery">Jewelery</option>
          <option value="category/men's clothing">Men's clothing</option>
        </select>
        <div className="">
          <input
            className="search-box"
            type="text"
            placeholder="Search Products"
            aria-label="Search"
          />
          <FaSearch className="text-mid" />
        </div>
      </Container>
      <Container className="home-cnt rounded-3 my-5">
        <div className="row mt-5">
          {products.map((product) => {
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
                      <span className="text-success text-small">25% off.</span>
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
