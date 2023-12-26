import Login from "./Login";
// import { useState } from "react";
import { UserContext } from "./UserContext";
import Entry from "./Entry";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Profile from "./components/Profile";
import Home from "./components/Home";
import About from "./components/About";
import CreateUser from "./CreateUser";
import { useState } from "react";
import Products from "./components/Products";
import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";

function App() {
  const [user, setUser] = useState({
    username: "",
    name: "",
  });

  const themeColor = useSelector((state) => state.thColor);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Entry />}>
          <Route path="" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateUser />} />
      </>
    )
  );

  return (
    <UserContext.Provider value={[user, setUser]}>
      <GlobalStyle themeColor={themeColor} />
      <RouterProvider router={router}>
        <Entry />
      </RouterProvider>
    </UserContext.Provider>
  );
}

const GlobalStyle = createGlobalStyle`
 body{
   background-color:${(props) =>
     props.themeColor === "light" ? "white" : "#212529"};
 }
`;

export default App;
