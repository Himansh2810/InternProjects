import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Entry from "./pages/Entry";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Entry />}>
          <Route path="" element={<Home />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </>
    )
  );

  return (
    <RouterProvider router={router}>
      <Entry />
    </RouterProvider>
  );
}

export default App;
