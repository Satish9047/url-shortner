import "./App.css";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import Home from "../../pages/home/Home";
import Header from "../../components/Header";
import Analytical from "../../pages/analytical/Analytical";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="/analytic" element={<Analytical />} />
      </Route>
    </Route>,
  ),
);

function AppRouter() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default AppRouter;
