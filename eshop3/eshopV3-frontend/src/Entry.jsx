import React, { useEffect } from "react";
import styled from "styled-components";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline, IoHome } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope
} from "react-icons/fa6";
import { MdOutlineLightMode, MdLightMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import changeTheme from "./store/theme/action";
import setUser from "./store/UserDetails/action";

function Entry() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  const themeColor = useSelector((state) => state.themeReducer.thColor);
  const dispatch = useDispatch();

  async function getUserDetails(token) {
    try {
      const data = await axios({
        method: "POST",
        url: "http://localhost:8000/api/auth/me/",
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });

      if (data) {
        dispatch(
          setUser({
            username: data.data.username,
            name: data.data.name,
            created_at: data.data.created_at
          })
        );
      }
    } catch (e) {
      toast.error("failed to get details");
    }
  }

  useEffect(() => {
    const usrToken = sessionStorage.getItem("eshop-user-token");
    if (usrToken) {
      getUserDetails(usrToken);
    } else {
      sessionStorage.clear();
      navigate("/login");
    }
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Are you sure want to logout ? ")) {
      try {
        const token = sessionStorage.getItem("eshop-user-token");
        const data = await axios({
          method: "POST",
          url: "http://localhost:8000/api/auth/logout/",
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });

        if (data) {
          sessionStorage.clear();
          navigate("/login");
        } else {
          toast.error("Something went wrong ..");
        }
      } catch (e) {
        toast.error(e.response.data);
      }
    }
  };

  function addBrdrToNav() {
    const navElement = document.querySelector(".nav-clr");

    if (window.scrollY > 100) {
      navElement.style.borderBottom = "4px solid #2e6cde";
      navElement.style.borderRadius = "1.5rem";
    } else if (navElement) {
      navElement.style.borderBottom = "none";
    }
  }

  window.addEventListener("scroll", addBrdrToNav);

  return (
    <>
      <AdditionCSS themecolor={themeColor}>
        <Navbar expand="lg" variant={themeColor} className="nav-clr fixed-top ">
          <Container fluid>
            <Navbar.Brand className="ms-3 fw-bold text-mid-large">
              <span className="text-primary">e</span>
              Shop
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto me-5 text-mid fw-medium">
                <Nav.Link
                  className="mx-2 thBtn"
                  title={`${themeColor} Mode`}
                  onClick={() =>
                    dispatch(
                      changeTheme(themeColor === "light" ? "dark" : "light")
                    )
                  }
                >
                  {themeColor === "light" ? (
                    <MdOutlineLightMode />
                  ) : (
                    <MdLightMode />
                  )}
                </Nav.Link>
                <Nav.Link className="mx-2">
                  <Link className="link-style" to="/">
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link className="mx-2">
                  <Link className="link-style" to="/products">
                    Products
                  </Link>
                </Nav.Link>
                <NavDropdown
                  className="nav-drop rounded-5 bg-primary"
                  title={user.username}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item className="text-mid-small text-dark  fw-medium">
                    <Link className="link-style" to="/profile">
                      <CgProfile />
                      &nbsp; Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="text-mid-small text-dark  fw-medium">
                    <Link className="link-style" to="/cart">
                      <PiShoppingCartDuotone />
                      &nbsp; Cart
                    </Link>
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
        <footer
          className={`mt-5 page-footer font-small blue pt-4 text- 
            ${themeColor === "light" ? "dark" : "secondary"}`}
        >
          <Container className="cnt text-center text-md-left">
            <section className="mt-2 d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
              <div className="me-5 d-none d-lg-block fw-medium ">
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
                      <span className="text-primary">&nbsp;e</span>
                      Shop
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
                    <p>Men&apos;s clothing</p>
                    <p>Women&apos;s clothing</p>
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

                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
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
          <div
            className="text-center p-4 fw-medium "
            style={{
              backgroundColor:
                themeColor === "light"
                  ? "rgba(0,0,0,0.1)"
                  : "rgba(255,255,255,0.1)"
            }}
          >
            © 2023 Copyright :
            <Link to="/" className=" ms-3 text-mid-small text-primary fw-bold">
              eshop.com
            </Link>
          </div>
        </footer>
      </AdditionCSS>

      <Toaster />
    </>
  );
}

const AdditionCSS = styled.div`
  .link-style {
    color: ${(props) => (props.themecolor === "light" ? "black" : "#5680cc")};
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
    background-color: ${(props) =>
      props.themecolor === "light" ? "white" : "#212529"};
    transition: 0.1s ease-in-out;
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
