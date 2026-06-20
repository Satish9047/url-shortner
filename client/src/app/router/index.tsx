import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import Home from "../../pages/home/Home";
import Analytical from "../../pages/analytical/Analytical";
import Navbar from "../../shared/components/Navbar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navbar />}>
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
