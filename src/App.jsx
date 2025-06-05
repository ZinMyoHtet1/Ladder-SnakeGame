import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";

import "./App.css";
import PlayGround from "./pages/PlayGround";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/playground" element={<PlayGround />} />
    </Route>,
  ])
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
