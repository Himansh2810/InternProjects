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
  confirm_password: "",
};

function CreateUser() {
  const navigate = useNavigate();

  //Validation using simple javscript code commented at line number 150+ >
  // validation using Formik & Yup

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
      ),
  });

  const form_names = ["name", "username", "password", "confirm_password"];

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: regSchema,
      onSubmit: (vals) => {
        const user = {
          username: vals.username,
          name: vals.name,
          password: vals.password,
        };

        createUserApi(user);
      },
    });

  async function createUserApi(user) {
    try {
      const data = await axios.post(
        "http://localhost:8085/api/create-user/",
        user
      );

      if (data.data.status === 404) {
        toast.error("Username Already exits ! \n Try different Username.");
      } else if (data.data.status === 500) {
        toast.error(
          "There is a problem in creating your account. \n Please try again."
        );
      } else {
        toast.success(
          "Account Created Successfully. \n Redirecting to Login ...",
          {
            style: {
              width: "30rem",
              height: "4rem",
              fontSize: "1rem",
              fontWeight: "500",
              color: "black",
            },
          }
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <AdditionCSS>
        <Container className="my-5 p-5 rounded">
          <h1 className="d-flex justify-content-center">
            <span className="text-primary">e</span>Shop
          </h1>
          <Form onSubmit={handleSubmit}>
            {form_names.map((fnames, index) => {
              return (
                <Form.Group key={index} className="m-3">
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
                    className={"inp text-mid"}
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
            duration: 2000,
          },
          error: {
            duration: 2500,
            style: {
              width: "30rem",
              height: "8rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "rgba(255,0,0,0.75)",
            },
          },
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

// const [name, setName] = useState("");
// const [uname, setUname] = useState("");
// const [pswd, setPswd] = useState("");
// const [cnfPswd, setCnfPswd] = useState("");

// const validateName = (val) => {
//   let nameElm = document.getElementById("name");
//   if (val) {
//     console.log(nameElm);
//     if (val.length < 2) {
//       nameElm.innerText = " Name should be greater than 1 letters ";
//     } else {
//       nameElm.innerText = "";
//       let matches = val.match(/^[A-Za-z ]+$/);
//       if (matches) nameElm.innerText = "";
//       else nameElm.innerText = "Name can't contain numbers or characters";
//     }
//   }
// };

// const validateUname = (val) => {
//   let unameElm = document.getElementById("uname");
//   if (val) {
//     console.log(unameElm);
//     if (val.length < 4) {
//       unameElm.innerText = " Username should be greater than 3 letters ";
//     } else {
//       unameElm.innerText = "";
//       let matches = val.match(/^[A-Za-z0-9._]+$/);
//       if (matches) unameElm.innerText = "";
//       else
//         unameElm.innerText =
//           "Username can only contain Capital & small alphabets , numbers and special characters  _(underscore) and . (dot)";
//     }
//   }
// };

// const validatePswd = (val) => {
//   let pswdElm = document.getElementById("pswd");
//   if (val) {
//     console.log(pswdElm);
//     if (val.length < 8) {
//       pswdElm.innerText = " Password should be greater than 7 letters ";
//     } else {
//       pswdElm.innerText = "";
//       if (
//         val.match(
//           "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^.&*-]).{8,}$"
//         ) &&
//         val.match(/^[A-Za-z0-9&$#@.]+$/)
//       ) {
//         pswdElm.innerText = "";
//       } else {
//         pswdElm.innerText =
//           "Password must contain atleast one Capital letter , small letter , number and one of the special character from these @  & # $   .";
//       }
//     }
//   }
// };

// const handleSubmit = () => {
//   let nameElm = document.getElementById("name");
//   let unameElm = document.getElementById("uname");
//   let pswdElm = document.getElementById("pswd");
//   if (name === "" || nameElm.innerText !== "") {
//     nameElm.innerText = "Please enter your Name correctly";
//   } else if (uname === "" || unameElm.innerText !== "") {
//     unameElm.innerText = "Please enter your Username correctly";
//   } else if (pswd === "" || pswdElm.innerText !== "") {
//     pswdElm.innerText = "Please enter your Password correctly";
//   } else if (cnfPswd === "" || cnfPswd !== pswd) {
//     document.getElementById("cnfpswd").innerText =
//       "Your Password & Confirm password must be same";
//   } else {
//     const user = {
//       username: uname,
//       name: name,
//       password: pswd,
//     };

//     localStorage.setItem(uname, JSON.stringify(user));
//     navigate("/login");
//   }
// };

// <Form.Control
//   onChange={(e) =>
//     e.target.value === pswd
//       ? setCnfPswd(e.target.value)
//       : e.target.value === ""
//       ? setCnfPswd("")
//       : setCnfPswd("border-danger")
//   }
//   className={
//     "inp text-mid " + (cnfPswd === "border-danger" ? "border-danger" : "")
//   }
//   name="confirm_password"
//   type="password"
// />;

//  <Form.Control
//    value={values.name}
//    onChange={(e) => {
//      setName(e.target.value);
//      validateName(e.target.value);
//    }}
//    className="inp text-mid"
//    name="name"
//    type="name"
//  />;
