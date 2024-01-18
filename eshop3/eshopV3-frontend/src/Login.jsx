import React, { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("eshop-user-token")) {
      navigate("/");
    }
  }, []);

  async function authenticateUserDetails(usr) {
    try {
      const data = await axios.post("http://localhost:8000/api/login/", usr);

      if (data.status === 200) {
        toast.success("Valid details ");
        sessionStorage.setItem("eshop-user-token", data.data.access_token);
        navigate("/");
      } else {
        toast.error(
          "There's a problem in Logging in you. \n Please try again."
        );
        // console.error(data.data.error);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (vals) => {
      if (vals.password === "" || vals.username === "") {
        toast.error("All the fields are required");
      } else {
        authenticateUserDetails(vals);
      }
    }
  });

  return (
    <>
      <AdditionCSS>
        <Container className="my-5 p-5 rounded">
          <h1 className="d-flex justify-content-center">
            <span className="text-primary">e</span>
            Shop
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
                className="inp text-mid"
                name="username"
                type="text"
                value={values.username}
                required
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
                className="inp text-mid"
                name="password"
                type="password"
                value={values.password}
                required
              />
            </Form.Group>
            <Form.Group className="flex-column  m-3">
              <Button
                onClick={handleSubmit}
                className="text-mid mt-3"
                variant="primary"
              >
                Login
              </Button>
              <h2 className="text-small fw-medium mt-5">
                Don&apos;t have an account ?{" "}
                <Link
                  onMouseOver={(e) =>
                    (e.target.style.textDecoration = "underline")
                  }
                  onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                  className="text-primary text-small"
                  to="/create-account"
                >
                  Create Account
                </Link>
                .
              </h2>
            </Form.Group>
          </Form>
        </Container>
      </AdditionCSS>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          success: {
            duration: 2000,
            style: {
              width: "25rem",
              height: "4rem",
              fontSize: "1.2rem",
              fontWeight: "bold"
            }
          },
          error: {
            duration: 2500,
            style: {
              width: "25rem",
              height: "4rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "rgba(255,0,0,0.75)"
            }
          }
        }}
      />
    </>
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
