import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();
  const [uname, setUname] = useState("");
  const [pswd, setPswd] = useState("");

  const handleSubmit = () => {
    const data = localStorage.getItem(uname);
    let warning = document.getElementById("warn");
    if (data) {
      warning.innerText = "";
      const user = JSON.parse(data);

      if (pswd === user.password) {
        warning.innerText = "";
        sessionStorage.setItem(uname, data);
        navigate("/");
      } else {
        warning.innerText = "Incorrect Details or empty fields";
      }
    } else {
      warning.innerText = "User not exist.";
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
            <Form.Label className="text-mid fw-medium ">Username</Form.Label>
            <Form.Control
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              className="inp text-mid"
              type="text"
            />
          </Form.Group>
          <Form.Group className="m-3">
            <Form.Label className="text-mid fw-medium ">Password</Form.Label>
            <Form.Control
              value={pswd}
              onChange={(e) => setPswd(e.target.value)}
              className="inp text-mid"
              type="password"
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
            <h2 className="text-small fw-medium mt-5">
              Don't have an account ?{" "}
              <Link className="text-primary text-small" to="/create-account">
                Create Account
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
    border-top: 4px solid rgb(46, 108, 222);
    border-bottom: 4px solid rgb(46, 108, 222);
    width: 90vh;
  }

  .inp {
    width: 50vh;
    caret-color: rgb(46, 108, 222);
  }
`;

export default Login;
