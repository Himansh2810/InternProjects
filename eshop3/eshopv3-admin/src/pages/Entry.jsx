import React, { useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Outlet, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { axiosPost, axiosGet } from "../helpers/axiosHelper";

function Entry() {
  const navigate = useNavigate();

  useEffect(() => {
    const usr_token = sessionStorage.getItem("eshop-admin-token");
    if (usr_token) {
      getAdminDetails();
    } else {
      sessionStorage.clear();
      navigate("/login");
    }
  }, []);

  const getAdminDetails = async () => {
    try {
      const data = await axiosGet("/admin/me");

      if (data) {
        console.log("Way to go admins");
      } else {
        console.log("restricted");
      }
    } catch (e) {
      console.error("failed to get details");
      console.error(e);
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure want to Logout ?")) {
      try {
        const data = await axiosPost("/admin/logout", {});

        if (data) {
          sessionStorage.clear();
          navigate("/login");
        } else {
          toast.error("Something is wrong ..");
        }
      } catch (e) {
        console.error(e);
        sessionStorage.clear();
        navigate("/login");
      }
    }
  };

  return (
    <>
      <AdditionCSS>
        <Navbar expand="lg" variant="light" className="nav-clr fixed-top ">
          <Container fluid>
            <Navbar.Brand href="/" className="ms-3 fw-bold text-mid-large">
              <span className="text-primary">e</span>Shop
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto me-5 text-mid fw-medium">
                <Nav.Link className="mx-2">
                  <Link className="link-style" to="/">
                    Add Product
                  </Link>
                </Nav.Link>
                <Nav.Link className="mx-2">
                  <Link className="link-style" to="/products">
                    Products
                  </Link>
                </Nav.Link>
                <Nav.Link className="mx-2">
                  <Link className="link-style" onClick={handleLogout}>
                    Logout
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </AdditionCSS>
      <Toaster />
    </>
  );
}

const AdditionCSS = styled.div`
  .link-style {
    color: black;
    text-decoration: none;
    transition: 0.2s ease-in-out;
    &:hover {
      color: #0275d8;
    }
  }
  .nav-drop {
    margin-right: 1rem;
  }
  .text-large {
    font-size: 3rem;
  }

  .text-mid-large {
    font-size: 2.25rem;
  }

  .text-mid {
    font-size: 1.5rem;
  }

  .text-mid-small {
    font-size: 1.2rem;
  }

  .nav-clr {
    background-color: white;
    border-bottom: 3px solid #0275d8;
  }

  .page-footer .cnt {
    border: none;
    border-top: 3px solid #0275d8;
    border-radius: 0.6rem;
  }

  .thBtn {
    &:hover {
      color: black;
    }
  }
`;

export default Entry;
