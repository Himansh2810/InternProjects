import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import Profic from "../assets/logo.png";

function Profile() {
  const navigate = useNavigate();
  const themeColor = useSelector((state) => {
    return state.themeReducer.thColor;
  });
  const user = useSelector((state) => {
    return state.userReducer.user;
  });

  const months = [
    "jan",
    "feb",
    "march",
    "april",
    "may",
    "june",
    "july",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
  ];

  const [newPassword, setNewPswd] = useState("");
  const [oldPassword, setOldPswd] = useState("");
  const [newName, setName] = useState("");
  const [disableForm, setDisableForm] = useState(true);
  const [changePswd, setChangePswd] = useState(false);
  const [checkPassword, setChkPswd] = useState("");
  const [joinedDate, setJoinedDate] = useState("");

  useEffect(() => {
    setName(user.name);
    setOldPswd(user.password);

    // extracting yyyy-mm-dd format
    const y = user.created_at.slice(0, 4);
    const m = months[parseInt(user.created_at.slice(5, 7), 10) - 1];

    const dt = `${user.created_at.slice(8, 10)} ${m} ${y}`;
    setJoinedDate(dt);
  }, [user]);

  const validatePswd = (val) => {
    const pswdElm = document.getElementById("pswd");

    if (val) {
      if (val.length < 8) {
        pswdElm.innerText = " Password must be at least 8 characters";
        return false;
      }
      pswdElm.innerText = "";
      if (
        val.match(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^.&*-]).{8,}$"
        ) &&
        val.match(/^[A-Za-z0-9&$#@.]+$/)
      ) {
        pswdElm.innerText = "";
        return true;
      }
      pswdElm.innerText =
        "Password must contain atleast one Capital letter , small letter , number and one of the special character from these @  & # $   .";
      return false;
    }
    return false;
  };

  const updateUser = async () => {
    if (newName === "" || oldPassword === "") {
      toast.error("Fields can't be empty");
      return;
    }

    if (changePswd && !validatePswd(newPassword)) {
      toast.error("Enter new password correctly.");
      return;
    }

    try {
      const upData = {
        username: user.username,
        name: newName,
        password: oldPassword,
        newPassword: changePswd ? newPassword : oldPassword
      };

      const res = await axios.post(
        "http://localhost:8000/api/auth/update-user/",
        upData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(
              "eshop-user-token"
            )}`
          }
        }
      );

      if (res) {
        if (
          res.data.status === 404 ||
          res.data.status === 400 ||
          res.data.status === 500
        ) {
          toast.error("Internal error occured or\n details not found");
        } else if (res.data.status === 401) {
          toast.error("Invalid password.Try again.");
        } else {
          toast.success("Your details updated successfully");
          setDisableForm(true);
        }
      }
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    disableForm ? setOldPswd(user.password) : setOldPswd("");
    setNewPswd("");
  }, [disableForm]);

  const delAccount = async () => {
    if (checkPassword === "") {
      toast.error("Password is required field");
    } else if (window.confirm("Are you sure want to Delete your account ? ")) {
      const res = await axios.post(
        "http://localhost:8000/api/auth/delete-user/",
        {
          username: user.username,
          password: checkPassword
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(
              "eshop-user-token"
            )}`
          }
        }
      );

      if (res) {
        if (
          res.data.status === 404 ||
          res.data.status === 400 ||
          res.data.status === 500
        ) {
          toast.error("Internal error occured or\n Details not found");
        } else if (res.data.status === 401) {
          toast.error("Invalid password.Try again.");
        } else {
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
                value={newName}
                disabled={disableForm}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="m-3">
              <Form.Label
                htmlFor="created_at"
                style={{ textTransform: "capitalize" }}
                className="text-mid text-primary fw-medium "
              >
                Joined On
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
                name="created_at"
                type="text"
                value={joinedDate}
                disabled
              />
            </Form.Group>

            {!disableForm ? (
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
                  value={oldPassword}
                  disabled={disableForm}
                  onChange={(e) => setOldPswd(e.target.value)}
                />

                <Form.Text className="text-secondary ">
                  Password required to update details.
                </Form.Text>
              </Form.Group>
            ) : null}

            {!disableForm ? (
              <Form.Group className="m-3">
                <Form.Label
                  htmlFor="newPassword"
                  className="text-mid  fw-medium "
                >
                  {changePswd ? (
                    <span className="text-mid text-primary">
                      {" "}
                      Enter new Password
                      <Button
                        onClick={() => {
                          document.getElementById("pswd").innerText = "";
                          setNewPswd("");
                          setChangePswd(!changePswd);
                        }}
                        className="rounded text-bg-secondary ms-2 text-small p-1 mb-2 chng-pswd "
                      >
                        Keep old Password
                        <MdCancel className=" ms-1 mb-1" />
                      </Button>
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
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  disabled={!changePswd}
                  onChange={(e) => {
                    setNewPswd(e.target.value);
                    validatePswd(e.target.value);
                  }}
                />
                <Form.Text className="text-danger" id="pswd" />
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
                          backgroundColor: "rgba(46, 109, 206,0.3)"
                        }}
                        className="rounded p-3 d-flex flex-column "
                      >
                        <Button
                          onClick={() => {
                            setChkPswd("");
                            close();
                          }}
                          style={{
                            borderRadius: "1rem",
                            width: "fit-content",
                            paddingLeft: ".5rem",
                            paddingRight: ".5rem",
                            marginTop: "-0.5rem",
                            backgroundColor: "rgb(46, 109, 206)",
                            cursor: "pointer",
                            color: "white"
                          }}
                        >
                          close
                        </Button>
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
                          name="checkPassword"
                          type="password"
                          value={checkPassword}
                          onChange={(e) => {
                            setChkPswd(e.target.value);
                          }}
                        />
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
            duration: 2000
          },
          error: {
            duration: 2500
          }
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
      color: ${(props) => (props.formstyle === "true" ? "#2e6cde" : "white")};
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
