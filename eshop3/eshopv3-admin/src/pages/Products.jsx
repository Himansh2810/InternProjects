import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Card, Button, Form } from "react-bootstrap";
import { axiosGet } from "../helpers/axiosHelper";
import Popup from "reactjs-popup";
import EditProduct from "../components/EditProduct";
import toast, { Toaster } from "react-hot-toast";
import { axiosPost } from "../helpers/axiosHelper";

function Products() {
  const [category, setCategory] = useState("");
  const [products, setProds] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("eshop-admin-token")) {
      FetchProducts(category);
    }
  }, [category]);

  async function FetchProducts(c) {
    const data = await axiosGet(`/products/${c}`);

    if (data) {
      if (data[0] !== undefined) {
        setProds(data);
      } else {
        setProds([]);
        toast.error("You timed out . login again");
      }
    }
  }

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const searchProducts = (e) => {
    let filter = e.target.value.toLowerCase();
    let divs = document.getElementsByClassName("cst");

    for (let i = 0; i < divs.length; i++) {
      let text_cnt = divs[i].textContent || divs[i].innerText;

      if (text_cnt.toLowerCase().indexOf(filter) > -1) {
        divs[i].style.display = "";
      } else {
        divs[i].style.display = "none";
      }
    }
  };

  const delaySearch = (callback, ms) => {
    let timer = 0;
    return function () {
      var context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  };

  const delProduct = async (id) => {
    if (window.confirm("Are you sure want to delete this Product ? ")) {
      try {
        const res = await axiosPost("/admin/delete-product", {
          id: id,
          username: "eshop_admin.007",
          password: admPswd,
        });

        if (res.status === 200) {
          toast.success("Product deleted successfully");
        } else {
          toast.error(res.message);
        }
      } catch (e) {
        //console.log(res.data.message);
        toast.error("Error : somthing went wrong");
        console.error(e);
      }
    }
  };

  const [admPswd, setAdminPswd] = useState("");

  return (
    <AdditionCSS>
      <Container className="header d-flex justify-content-around align-items-center">
        <select
          className="form-select w-25 bg-white text-black"
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
            className="search-box text-mid-small bg-white text-black"
            type="text"
            placeholder="Search Products"
            aria-label="Search"
            onKeyUp={delaySearch(searchProducts, 500)}
          />
        </div>
      </Container>
      <Container className="home-cnt rounded-3 my-5">
        <div className="row mt-5">
          {products.map((product) => {
            return (
              <Card key={product.id} className="m-5 h-auto col-3 cst bg-white">
                <div className="d-flex">
                  <Popup
                    modal
                    nested
                    trigger={
                      <Button
                        className="btn-danger m-3 text-center"
                        style={{ width: "16vh" }}
                      >
                        Delete
                      </Button>
                    }
                  >
                    {(close) => (
                      <div
                        style={{
                          backgroundColor: "rgb(221,227,240)",
                        }}
                        className="rounded p-3 d-flex flex-column "
                      >
                        <span
                          onClick={() => {
                            setAdminPswd("");
                            close();
                          }}
                          style={{
                            borderRadius: "1rem",
                            width: "fit-content",
                            paddingLeft: ".5rem",
                            paddingRight: ".5rem",
                            marginTop: "-0.5rem",
                            backgroundColor: "rgb(46, 109, 206)",
                            cursor: "pointer",
                            color: "white",
                          }}
                        >
                          close
                        </span>
                        <Form.Label className="mt-3 fw-medium ">
                          Enter Password for Deleting Product
                        </Form.Label>
                        <Form.Control
                          className="text-mid bg-white text-black"
                          name="check_password"
                          type="password"
                          value={admPswd}
                          onChange={(e) => {
                            setAdminPswd(e.target.value);
                          }}
                        ></Form.Control>
                        <Button
                          className="mt-3"
                          onClick={() => {
                            delProduct(product.id);
                            close();
                          }}
                          variant="danger"
                        >
                          Delete Product
                        </Button>
                      </div>
                    )}
                  </Popup>
                  <Popup
                    modal
                    nested
                    trigger={
                      <Button
                        className="btn-primary m-2 "
                        style={{ width: "25vh" }}
                      >
                        Edit &#9998;
                      </Button>
                    }
                  >
                    {(close) => (
                      <PopupCSS>
                        <div
                          style={{
                            position: "fixed",
                            width: "98vh",
                            height: "5rem",
                            borderBottom: "3px solid #2e6cde",
                            backgroundColor: "white",
                            borderTopLeftRadius: "1rem",
                            borderTopRightRadius: "0rem",
                            paddingTop: "1.5rem",
                          }}
                        >
                          <span
                            style={{
                              cursor: "pointer",
                              backgroundColor: "rgba(46, 108, 222,.5)",
                            }}
                            className="rounded  p-2 m-3"
                            onClick={() => close()}
                          >
                            close
                          </span>
                          <h2
                            className="m-2 text-primary"
                            style={{ float: "right" }}
                          >
                            Edit Products
                          </h2>
                        </div>
                        <div className="p-3">
                          <EditProduct product={product} />
                        </div>
                      </PopupCSS>
                    )}
                  </Popup>
                </div>
                <Card.Text className="fw-medium m-2 text-dark">
                  {product.category}
                </Card.Text>
                <Card.Img
                  className="m-3 w-75 "
                  src={product.imageUrl}
                ></Card.Img>
                <Card.Body>
                  <Card.Title className="text-mid fw-medium text-primary">
                    {product.title}{" "}
                    <h3 className="text-success mt-2 d-flex justify-content-between ">
                      <span>{product.rating}&nbsp; &#9733;</span>
                      <p className="text-small mt-2 text-dark">
                        {product.ratingCount} ratings
                      </p>
                    </h3>
                  </Card.Title>
                  <Card.Text className="text-mid fw-medium mt-3 ms-3">
                    <h2 className="d-flex align-items-center justify-content-start">
                      <span className="d-flex align-items-center text-dark">
                        {product.price}$
                      </span>

                      <span className="text-mid-small text-danger  prev-p d-flex align-items-center ms-2 ">
                        {PrevPrice(product.price)}$
                      </span>
                      <span className="text-success text-mid-small">
                        25% off.
                      </span>
                    </h2>
                    <h5 className="mt-3 d-block text-truncate text-dark">
                      {product.description}
                    </h5>
                  </Card.Text>
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

function PrevPrice(p) {
  return (p + p * 0.25).toFixed(2);
}

const PopupCSS = styled.div`
  width: 100vh;
  height: 87vh;
  background-color: rgb(221, 227, 240);
  border-radius: 1rem;
  margin-top: 5rem;
  overflow-y: scroll;
  /* border: 5px solid rgb(46, 108, 222); */
  border-top: 3px solid rgb(46, 108, 222);
`;

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
  }
`;

export default Products;
