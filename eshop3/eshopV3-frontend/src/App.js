import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import Profile from "./components/Profile";
import Home from "./components/Home";
import About from "./components/About";
import CreateUser from "./CreateUser";
import Products from "./components/Products";
import Login from "./Login";
import Entry from "./Entry";
import Cart from "./components/Cart";

function App() {
  const themeColor = useSelector((state) => {
    return state.themeReducer.thColor;
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Entry />}>
          <Route path="" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateUser />} />
      </>
    )
  );

  return (
    <>
      <GlobalStyle themecolor={themeColor} />
      <RouterProvider router={router}>
        <Entry />
      </RouterProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
 body{
   background-color:${(props) => {
     return props.themecolor === "light" ? "white" : "#212529";
   }};
 }
 `;

export default App;
