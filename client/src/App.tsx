import "./App.css";
import Home from "./pages/home/Home";
import Analytical from "./pages/analytical/Analytical";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Header from "./components/Header";
// import LinksAside from "./components/Links";

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

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
