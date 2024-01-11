import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"; //"bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
// import dotenv from "dotenv";

// dotenv.config();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
