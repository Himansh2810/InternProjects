import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function CreateUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [uname, setUname] = useState("");
  const [pswd, setPswd] = useState("");
  const [cnfPswd, setCnfPswd] = useState("");

  const validateName = (val) => {
    let nameElm = document.getElementById("name");
    if (val) {
      console.log(nameElm);
      if (val.length < 2) {
        nameElm.innerText = " Name should be greater than 1 letters ";
      } else {
        nameElm.innerText = "";
        let matches = val.match(/^[A-Za-z ]+$/);
        if (matches) nameElm.innerText = "";
        else nameElm.innerText = "Name can't contain numbers or characters";
      }
    }
  };

  const validateUname = (val) => {
    let unameElm = document.getElementById("uname");
    if (val) {
      console.log(unameElm);
      if (val.length < 4) {
        unameElm.innerText = " Username should be greater than 3 letters ";
      } else {
        unameElm.innerText = "";
        let matches = val.match(/^[A-Za-z0-9@._]+$/);
        if (matches) unameElm.innerText = "";
        else
          unameElm.innerText =
            "Username can't contain characters other than  @    _ and . (dot)";
      }
    }
  };

  const validatePswd = (val) => {
    let pswdElm = document.getElementById("pswd");
    if (val) {
      console.log(pswdElm);
      if (val.length < 8) {
        pswdElm.innerText = " Password should be greater than 7 letters ";
      } else {
        pswdElm.innerText = "";
        if (
          val.match(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^.&*-]).{8,}$"
          ) &&
          val.match(/^[A-Za-z0-9&$#@.]+$/)
        ) {
          pswdElm.innerText = "";
        } else {
          pswdElm.innerText =
            "Password must contain atleast one Capital letter , small letter , number and one of the special character from these @  & # $   .";
        }
      }
    }
  };

  const handleSubmit = () => {
    let nameElm = document.getElementById("name");
    let unameElm = document.getElementById("uname");
    let pswdElm = document.getElementById("pswd");
    if (name === "" || nameElm.innerText !== "") {
      nameElm.innerText = "Please enter your Name correctly";
    } else if (uname === "" || unameElm.innerText !== "") {
      unameElm.innerText = "Please enter your Username correctly";
    } else if (pswd === "" || pswdElm.innerText !== "") {
      pswdElm.innerText = "Please enter your Password correctly";
    } else if (cnfPswd === "" || cnfPswd !== pswd) {
      document.getElementById("cnfpswd").innerText =
        "Your Password & Confirm password must be same";
    } else {
      const user = {
        username: uname,
        name: name,
        password: pswd,
      };

      localStorage.setItem(uname, JSON.stringify(user));
      navigate("/login");
    }
  };

  return (
    <AdditionCSS>
      <Container className="my-5 p-5 rounded">
        <h1 className="d-flex justify-content-center">
          <span className="text-primary">e</span>Shop
        </h1>
        <Form>
          <Form.Group className="m-3">
            <Form.Label className="text-mid fw-medium ">Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
              className="inp text-mid"
              type="text"
            />
            <Form.Text id="name" className="text-danger"></Form.Text>
          </Form.Group>
          <Form.Group className="m-3">
            <Form.Label className="text-mid fw-medium ">Username</Form.Label>
            <Form.Control
              value={uname}
              onChange={(e) => {
                setUname(e.target.value);
                validateUname(e.target.value);
              }}
              className="inp text-mid"
              type="text"
            />
            <Form.Text id="uname" className="text-danger"></Form.Text>
          </Form.Group>
          <Form.Group className="m-3">
            <Form.Label className="text-mid fw-medium ">Password</Form.Label>
            <Form.Control
              value={pswd}
              onChange={(e) => {
                setPswd(e.target.value);
                validatePswd(e.target.value);
              }}
              className="inp text-mid"
              type="password"
            />
            <Form.Text id="pswd" className="text-danger"></Form.Text>
          </Form.Group>

          <Form.Group className="m-3">
            <Form.Label className="text-mid fw-medium ">
              Confirm Password
            </Form.Label>
            <Form.Control
              onChange={(e) =>
                e.target.value === pswd
                  ? setCnfPswd(e.target.value)
                  : e.target.value === ""
                  ? setCnfPswd("")
                  : setCnfPswd("border-danger")
              }
              className={
                "inp text-mid " +
                (cnfPswd === "border-danger" ? "border-danger" : "")
              }
              type="password"
            />
            <Form.Text id="cnfpswd" className="text-danger"></Form.Text>
          </Form.Group>
          <Form.Group className="flex-column  m-3">
            <Button
              onClick={handleSubmit}
              className="text-mid mt-3"
              variant="primary"
            >
              Create Account
            </Button>
            <h2 className="text-small fw-medium mt-5">
              Already have an account ?{" "}
              <Link className="text-primary text-small" to="/login">
                Login
              </Link>
              .
            </h2>
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
    border-top: 5px solid rgb(46, 108, 222);
    border-bottom: 5px solid rgb(46, 108, 222);
    width: 90vh;
  }

  .inp {
    width: 50vh;
    caret-color: rgb(46, 108, 222);
  }
`;

export default CreateUser;
