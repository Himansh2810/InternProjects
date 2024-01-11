import React from "react";
import { Form, Container, Button } from "react-bootstrap";
import styled from "styled-components";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { axiosPost } from "../helpers/axiosHelper";

function Home() {
  const initialValues = {
    title: "",
    category: "",
    description: "",
    imageUrl: "",
    price: 0,
    rating: 0.0,
    ratingCount: 0,
  };

  const prod_atr = [
    "title",
    "category",
    "price",
    "rating",
    "ratingCount",
    "imageUrl",
    "description",
  ];

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: (vals) => {
      addProducts(vals);
    },
  });

  const addProducts = async (product) => {
    try {
      const res = axiosPost("/admin/add-product", product);

      if (res) {
        console.log(res.data);
        toast.success("Product added successfully");
      }
    } catch (e) {
      //console.log(res.data.message);
      toast.error("Error : somthing went wrong");
      console.error(e);
    }
  };

  return (
    <>
      <AdditionalCSS>
        <Container className="home-cnt">
          <h2 className="m-2">Add Products</h2>
          <Form>
            {prod_atr.map((atr) => (
              <Form.Group className="m-3">
                <Form.Label
                  htmlFor={atr}
                  style={{ textTransform: "capitalize" }}
                  className="text-mid text-primary fw-medium "
                >
                  {atr}
                </Form.Label>
                <Form.Control
                  className="inp text-mid bg-light text-dark"
                  name={atr}
                  type={
                    atr === "price" || atr === "rating" || atr === "ratingCount"
                      ? "number"
                      : "text"
                  }
                  value={values[atr]}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}

            <Form.Group className="flex-column  m-3">
              <Button
                onClick={handleSubmit}
                className="text-mid mt-3"
                variant="primary"
              >
                Add Product
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </AdditionalCSS>
      <Toaster />
    </>
  );
}

const AdditionalCSS = styled.div`
  .inp {
    caret-color: #2e6cde;
    background-color: white;
    border: none;
    transition: 0.5s ease-in-out;
    color: black;
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

  .home-cnt {
    height: fit-content;
    margin-top: 8rem;
    border-bottom: 3px solid #2e6cde;
  }
`;

export default Home;
