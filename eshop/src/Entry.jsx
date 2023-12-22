import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa6";

function Entry() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if (sessionStorage.length === 0) {
      navigate("/login");
    } else {
      const data = sessionStorage;
      const data2 = Object.keys(data).map((key, value) => [key, value]);
      const usr = JSON.parse(data[data2[0][0]]);
      setUser(usr);
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure want to logout ? ")) {
      sessionStorage.clear();
      navigate("/login");
    }
  };

  function addBrdrToNav() {
    var navElement = document.querySelector(".nav-clr");

    if (this.scrollY > 100) {
      navElement.style.borderBottom = "4px solid #2e6cde";
      navElement.style.borderRadius = "1.5rem";
    } else {
      navElement.style.borderBottom = "none";
    }
  }

  window.addEventListener("scroll", addBrdrToNav);

  return (
    <AdditionCSS>
      <Navbar expand="lg" className="nav-clr fixed-top ">
        <Container fluid>
          <Navbar.Brand href="/" className="ms-3 fw-bold text-mid-large">
            <span className="text-primary">e</span>Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-5 text-mid fw-medium">
              <Nav.Link className="mx-2" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="mx-2" href="/products">
                Products
              </Nav.Link>
              <NavDropdown
                className="rounded-5 bg-primary"
                title={user.username}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  className="text-mid-small text-dark  fw-medium"
                  href="/profile"
                >
                  <CgProfile />
                  &nbsp; Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-mid-small text-dark  fw-medium"
                  href="/profile"
                >
                  <PiShoppingCartDuotone />
                  &nbsp; Cart
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  className="text-dark text-mid-small fw-medium"
                  onClick={handleLogout}
                >
                  <IoLogOutOutline />
                  &nbsp; Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <footer className="mt-5 page-footer font-small blue pt-4">
        <Container className="cnt text-center text-md-left">
          <section className="mt-2 d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div className="me-5 d-none d-lg-block fw-medium">
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
              <FaInstagram className="me-4 text-reset" />
              <FaFacebookF className="me-4 text-reset" />
              <FaLinkedinIn className="me-4 text-reset" />
              <FaGithub className="me-4 text-reset" />
            </div>
          </section>
          <section className="">
            <Container className="text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="fw-bold text-mid mb-4">
                    <PiShoppingCartDuotone />
                    <span className="text-primary">&nbsp;e</span>Shop
                  </h6>
                  <p>
                    eShop provides great experience in product buying and at
                    great price also.
                  </p>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-mid-small text-uppercase fw-bold mb-4">
                    Products
                  </h6>
                  <p>Electronics</p>
                  <p>Men's clothing</p>
                  <p>Women's clothing</p>
                  <p>Jewelery</p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-mid-small text-uppercase fw-bold mb-4">
                    Useful links
                  </h6>
                  <p>
                    <a href="/about" className="text-reset">
                      About
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Help
                    </a>
                  </p>
                </div>

                <div
                  md="4"
                  lg="3"
                  xl="3"
                  className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4"
                >
                  <h6 className="text-uppercase text-mid-small fw-bold mb-4">
                    Contact
                  </h6>
                  <p>
                    <IoHome className="me-3" />
                    Sola , Ahmedabad , Gujarat .
                  </p>
                  <p>
                    <FaEnvelope className="me-3" />
                    eshop@shop.com
                  </p>
                  <p>
                    <FaPhoneAlt className="me-3" />
                    +91 9876543210
                  </p>
                </div>
              </div>
            </Container>
          </section>
        </Container>
        <div className="last-foot text-center p-4 fw-medium ">
          © 2023 Copyright :
          <a className=" ms-3 text-mid-small text-primary fw-bold" href="/">
            eshop.com
          </a>
        </div>
      </footer>
    </AdditionCSS>
  );
}

const AdditionCSS = styled.div`
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
    transition: 0.1s ease-in-out;
  }

  .nav-link {
    &:hover {
      color: #0275d8;
    }
  }

  .rounded-5 a {
    color: white;
    &:hover {
      color: white;
    }
  }

  .page-footer .cnt {
    border: none;
    border-top: 3px solid #0275d8;
    border-radius: 0.6rem;
  }

  .last-foot {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export default Entry;
