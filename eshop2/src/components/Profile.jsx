import React, { useEffect, useContext, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Profic from "../assets/logo.png";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const themeColor = useSelector((state) => state.themeReducer.thColor);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    setName(user.name);
    setOldPswd(user.password);
  }, [user]);

  const [new_password, setNewPswd] = useState("");
  const [old_password, setOldPswd] = useState("");
  const [new_name, setName] = useState("");
  const [disableForm, setDisableForm] = useState(true);
  const [changePswd, setChangePswd] = useState(false);
  const [check_password, setChkPswd] = useState("");

  const updateUser = async () => {
    if (new_name === "" || old_password === "") {
      toast.error("Fields can't be empty");
      return;
    }

    if (changePswd && !validatePswd(new_password)) {
      toast.error("Enter new password correctly.");
      return;
    }

    try {
      const up_data = {
        username: user.username,
        name: new_name,
        password: old_password,
        new_password: changePswd ? new_password : old_password,
      };

      const res = await axios.post(
        "http://localhost:8085/api/update-user/",
        up_data
      );

      if (res) {
        if (res.data.status === 404 || res.data.status === 500) {
          toast.error(res.data.response);
        } else {
          toast.success(res.data.response);
          setDisableForm(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    disableForm ? setOldPswd(user.password) : setOldPswd("");
    setNewPswd("");
  }, [disableForm]);

  const validatePswd = (val) => {
    let pswdElm = document.getElementById("pswd");

    if (val) {
      if (val.length < 8) {
        pswdElm.innerText = " Password must be at least 8 characters";
        return false;
      } else {
        pswdElm.innerText = "";
        if (
          val.match(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^.&*-]).{8,}$"
          ) &&
          val.match(/^[A-Za-z0-9&$#@.]+$/)
        ) {
          pswdElm.innerText = "";
          return true;
        } else {
          pswdElm.innerText =
            "Password must contain atleast one Capital letter , small letter , number and one of the special character from these @  & # $   .";
          return false;
        }
      }
    } else {
      return false;
    }
  };

  const delAccount = async () => {
    if (check_password === "") {
      toast.error("Field Can't be empty");
    } else {
      const res = await axios.post("http://localhost:8085/api/delete-user/", {
        username: user.username,
        password: check_password,
      });
      if (res) {
        if (res.data.status === 404 || res.data.status === 500) {
          toast.error(res.data.response);
        } else {
          toast.success(res.data.response);
          sessionStorage.clear();
          navigate("/login");
        }
      }
    }
  };

  return (
    <>
      <AdditionalCSS formstyle={disableForm.toString()} themecolor={themeColor}>
        <Container className="home-cnt text-black ">
          <div className="d-flex justify-content-start align-items-center">
            <img
              src={Profic}
              width="100"
              style={{ borderRadius: "50%" }}
              className="m-5"
              alt="Profile Pic"
            />
            <div className="fw-medium text-primary text-mid">
              @{user.username}
            </div>
          </div>
          <Form>
            <Form.Group className="m-3">
              <Form.Label
                htmlFor="name"
                style={{ textTransform: "capitalize" }}
                className="text-mid text-primary fw-medium "
              >
                Name
              </Form.Label>
              <Form.Control
                className={
                  disableForm
                    ? "inp text-mid bg-" +
                      themeColor +
                      " text-" +
                      (themeColor === "light" ? "dark" : "light")
                    : "text-mid bg-" +
                      themeColor +
                      " text-" +
                      (themeColor === "light" ? "dark" : "light")
                }
                name="name"
                type="text"
                value={new_name}
                disabled={disableForm}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="m-3">
              <Form.Label
                htmlFor="password"
                style={{ textTransform: "capitalize" }}
                className="text-mid text-primary fw-medium "
              >
                {!changePswd ? "Password" : "Enter old Password"}
              </Form.Label>
              <Form.Control
                className={
                  disableForm
                    ? "inp text-mid bg-" +
                      themeColor +
                      " text-" +
                      (themeColor === "light" ? "dark" : "light")
                    : "text-mid bg-" +
                      themeColor +
                      " text-" +
                      (themeColor === "light" ? "dark" : "light")
                }
                name="password"
                type="password"
                value={old_password}
                disabled={disableForm}
                onChange={(e) => setOldPswd(e.target.value)}
              />
              {!disableForm ? (
                <Form.Text className="text-secondary ">
                  Password required to update details.
                </Form.Text>
              ) : null}
            </Form.Group>

            {!disableForm ? (
              <Form.Group className="m-3">
                <Form.Label
                  htmlFor="new_password"
                  className="text-mid  fw-medium "
                >
                  {changePswd ? (
                    <span className="text-mid text-primary">
                      {" "}
                      Enter new Password
                      <span
                        onClick={() => {
                          document.getElementById("pswd").innerText = "";
                          setNewPswd("");
                          setChangePswd(!changePswd);
                        }}
                        className="rounded text-bg-secondary ms-2 text-small p-1 mb-2 chng-pswd "
                      >
                        Keep old Password
                        <MdCancel className=" ms-1 mb-1" />
                      </span>
                    </span>
                  ) : (
                    <span>
                      <span
                        className={
                          "text-small text-" + themeColor === "light"
                            ? "black"
                            : "white"
                        }
                      >
                        Do you want to change your Password ?
                      </span>
                      <CiEdit
                        className="chng-pswd text-mid text-primary "
                        onClick={() => setChangePswd(!changePswd)}
                      />
                    </span>
                  )}
                </Form.Label>
                <Form.Control
                  className={
                    "text-mid bg-" +
                    (themeColor === "light" ? "white" : "dark") +
                    " text-" +
                    (themeColor === "light" ? "black" : "white") +
                    (!changePswd ? " inp" : "")
                  }
                  name="new_password"
                  type="password"
                  value={new_password}
                  disabled={!changePswd}
                  onChange={(e) => {
                    setNewPswd(e.target.value);
                    validatePswd(e.target.value);
                  }}
                />
                <Form.Text className="text-danger" id="pswd"></Form.Text>
              </Form.Group>
            ) : null}
            <Form.Group className="flex-column  m-3">
              <div
                className=" mt-3 d-flex align-items-center "
                style={{ width: "fit-content" }}
              >
                <FaUserEdit className="text-mid text-primary" />
                <Button
                  className="fw-medium ms-2  btn"
                  onClick={() => {
                    disableForm ? setDisableForm(!disableForm) : updateUser();
                  }}
                >
                  {disableForm ? "Edit Your Details" : "Save Changes"}
                </Button>
                {!disableForm ? (
                  <Button
                    className="fw-medium ms-2 btn"
                    onClick={() => setDisableForm(!disableForm)}
                  >
                    Cancel
                  </Button>
                ) : null}
              </div>
            </Form.Group>
            {disableForm ? (
              <Form.Group className="flex-column  m-3">
                <div
                  className=" mt-3 d-flex align-items-center "
                  style={{ width: "fit-content" }}
                >
                  <AiOutlineUserDelete className="text-mid text-danger" />

                  <Popup
                    modal
                    nested
                    trigger={
                      <Button className="fw-medium ms-2 del-btn">
                        Delete Your Account
                      </Button>
                    }
                  >
                    {(close) => (
                      <div
                        style={{
                          backgroundColor: "rgba(46, 109, 206,0.3)",
                        }}
                        className="rounded p-3 d-flex flex-column "
                      >
                        <span
                          onClick={() => close()}
                          style={{
                            borderRadius: "1rem",
                            width: "fit-content",
                            paddingLeft: ".5rem",
                            paddingRight: ".5rem",
                            marginTop: "-0.5rem",
                            backgroundColor: "rgb(46, 109, 206)",
                            cursor: "pointer",
                            color: "white",
                          }}
                        >
                          close
                        </span>
                        <Form.Label className="mt-3 fw-medium ">
                          Enter Password for Deleting Account
                        </Form.Label>
                        <Form.Control
                          className={
                            "text-mid bg-" +
                            (themeColor === "light" ? "white" : "dark") +
                            " text-" +
                            (themeColor === "light" ? "black" : "white") +
                            (!changePswd ? " inp" : "")
                          }
                          name="check_password"
                          type="password"
                          value={check_password}
                          onChange={(e) => {
                            setChkPswd(e.target.value);
                          }}
                        ></Form.Control>
                        <Button
                          className="mt-3"
                          onClick={delAccount}
                          variant="danger"
                        >
                          Delete Account
                        </Button>
                      </div>
                    )}
                  </Popup>
                </div>
              </Form.Group>
            ) : null}
          </Form>
        </Container>
      </AdditionalCSS>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 2000,
          },
          error: {
            duration: 2500,
          },
        }}
      />
    </>
  );
}

const AdditionalCSS = styled.div`
  .chng-pswd {
    cursor: pointer;
    font-weight: bolder;
    transition: 0.2s ease-in-out;
    &:hover {
      transform: scale(1.2);
    }
  }
  .btn {
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 0.5rem;
    background-color: ${(props) =>
      props.formstyle === "true"
        ? props.themecolor === "light"
          ? "#fff"
          : "#212529"
        : "rgb(46, 109, 206)"};
    color: ${(props) =>
      props.formstyle === "true"
        ? props.themecolor === "light"
          ? "black"
          : "white"
        : "white"};
    width: fit-content;
    transition: 0.2s ease-in-out;
    &:active {
      background-color: #5680cc;
      transform: scale(0.9);
    }
    &:hover {
      color: ${(props) => (props.formstyle === "true" ? `#2e6cde` : "white")};
    }
  }
  .inp {
    width: 50vh;
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
    border-top: 3px solid #2e6cde;
    border-bottom: 3px solid #2e6cde;
  }
`;

export default Profile;
