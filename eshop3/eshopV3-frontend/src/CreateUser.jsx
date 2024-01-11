import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const initialValues = {
  name: "",
  username: "",
  password: "",
  confirm_password: ""
};

function CreateUser() {
  const navigate = useNavigate();

  const regSchema = Yup.object({
    name: Yup.string()
      .min(2)
      .max(20)
      .required("You don't have your name ? ")
      .matches(
        /^[A-Za-z ]+$/,
        "I don't think name contains numbers & special charactors .. "
      ),
    username: Yup.string()
      .required()
      .min(3)
      .max(15)
      .matches(
        /^[A-Za-z0-9._]+$/,
        "Username can only contain Capital & small alphabets , numbers and special characters  _(underscore) and . (dot) and no-space"
      ),
    password: Yup.string()
      .min(8)
      .max(20)
      .required("")
      .matches(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$&.]).{8,}$",
        "Password must contain atleast one Capital letter , small letter , number and one of the special character from these @ & # $  ."
      )
      .matches(
        /^[A-Za-z0-9&$#@.]+$/,
        "Password doesn't contain space and character other than @ & # $  ."
      ),
    confirm_password: Yup.string()
      .required()
      .oneOf(
        [Yup.ref("password"), null],
        "Confirm password must be same as Password"
      )
  });

  const formNames = ["name", "username", "password", "confirm_password"];

  async function createUserApi(user) {
    try {
      const data = await axios.post(
        "http://localhost:8000/api/create-user/",
        user
      );

      if (data.data.status === 400) {
        toast.error("Username Already exits ! \n Try different Username.");
      } else if (data.data.status === 500) {
        toast.error(
          "There is a problem in creating your account. \n Please try again."
        );
      } else if (data.data.status === 200) {
        toast.success(
          "Account Created Successfully. \n Redirecting to Login ...",
          {
            style: {
              width: "30rem",
              height: "4rem",
              fontSize: "1rem",
              fontWeight: "500",
              color: "black"
            }
          }
        );
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else if (data.data.message) {
        toast.error(data.data.message);
      } else {
        toast.error("Unknwon error occured . \n Please try again.");
      }
    } catch (e) {
      // console.log(e);
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: regSchema,
      onSubmit: (vals) => {
        const user = {
          username: vals.username,
          name: vals.name,
          password: vals.password
        };

        createUserApi(user);
      }
    });

  return (
    <>
      <AdditionCSS>
        <Container className="my-5 p-5 rounded">
          <h1 className="d-flex justify-content-center">
            <span className="text-primary">e</span>Shop
          </h1>
          <Form onSubmit={handleSubmit}>
            {formNames.map((fnames) => {
              return (
                <Form.Group key={1} className="m-3">
                  <Form.Label
                    htmlFor={fnames}
                    style={{ textTransform: "capitalize" }}
                    className="text-mid fw-medium "
                  >
                    {fnames === "confirm_password"
                      ? "Confirm Password"
                      : fnames}
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="inp text-mid"
                    name={fnames}
                    type={fnames.includes("password") ? "password" : "text"}
                    value={values[fnames]}
                  />
                  {errors[fnames] && touched[fnames] ? (
                    <Form.Text id="name" className="text-danger">
                      {errors[fnames]}
                    </Form.Text>
                  ) : null}
                </Form.Group>
              );
            })}
            <Form.Group className="flex-column  m-3">
              <Button className="text-mid mt-3" variant="primary" type="submit">
                Create Account
              </Button>
              <h2 className="text-small fw-medium mt-5">
                Already have an account ?{" "}
                <Link className="text-primary text-small" to="/login">
                  Login
                </Link>
                .
              </h2>
              <h4 id="disp_error" className="text-danger">
                {" "}
              </h4>
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
            duration: 2000
          },
          error: {
            duration: 2500,
            style: {
              width: "30rem",
              height: "8rem",
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

  .text-mid-large {
    font-size: 2rem;
  }

  .text-small {
    font-size: 1.1rem;
    text-decoration: none;
  }

  .rounded {
    border-top: 5px solid rgb(46, 108, 222);
    border-bottom: 5px solid rgb(46, 108, 222);
    width: 90vh;
  }

  .inp {
    width: 50vh;
    caret-color: #2e6cde;
  }
`;

export default CreateUser;
