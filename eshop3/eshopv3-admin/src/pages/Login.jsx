import React, { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import { axiosPost } from "../helpers/axiosHelper";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("eshop-admin-token")) {
      navigate("/");
    }
  }, []);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (vals) => {
      if (vals.password === "" || vals.username === "") {
        console.error("All the fields are required");
      } else {
        authenticateUserDetails(vals);
      }
    },
  });

  async function authenticateUserDetails(usr) {
    try {
      const data = await axiosPost("/admin/login", usr);
      //passwd : eshop@admin.pass#007

      if (data.access_token) {
        console.log("Valid details ");
        sessionStorage.setItem("eshop-admin-token", data.access_token);
        navigate("/");
      } else {
        console.error(
          `There's a problem in Logging in you. \n Please try again.`
        );
        console.error(data);
      }
    } catch (e) {
      console.error(e);
      console.error(`Invalid Username or Password.`);
    }
  }

  return (
    <AdditionCSS>
      <Container className="my-5 p-5 rounded">
        <h1 className="d-flex justify-content-center">
          <span className="text-primary">e</span>Shop Admin
        </h1>
        <Form>
          <Form.Group className="m-3">
            <Form.Label
              htmlFor="username"
              style={{ textTransform: "capitalize" }}
              className="text-mid fw-medium "
            >
              Username
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              className={"inp text-mid"}
              name="username"
              type="text"
              value={values.username}
              required={true}
            />
          </Form.Group>

          <Form.Group className="m-3">
            <Form.Label
              htmlFor="password"
              style={{ textTransform: "capitalize" }}
              className="text-mid fw-medium "
            >
              Password
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              className={"inp text-mid"}
              name="password"
              type="password"
              value={values.password}
              required={true}
            />
          </Form.Group>
          <Form.Text id="warn" className="text-danger"></Form.Text>
          <Form.Group className="flex-column  m-3">
            <Button
              onClick={handleSubmit}
              className="text-mid mt-3"
              variant="primary"
            >
              Login
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </AdditionCSS>
  );
}

const AdditionCSS = styled.div`
  .text-mid {
    font-size: 1.5rem;
  }

  .text-small {
    font-size: 1.1rem;
    text-decoration: none;
  }

  .rounded {
    border-top: 4px solid rgb(46, 108, 222);
    border-bottom: 4px solid rgb(46, 108, 222);
    width: 90vh;
  }

  .inp {
    width: 50vh;
    caret-color: #2e6cde;
  }
`;

export default Login;
