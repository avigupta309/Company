import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Map } from "./components/Map/Map";
import {
  Country,
  ForgetPassword,
  Login,
  // Map,
  Signup,
  World,
} from "./components/Provider/Provider";
export default function App() {
  const allRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "forget",
      element: <ForgetPassword />,
    },
    {
      path: "Signup",
      element: <Signup />,
    },
    {
      path: "country",
      element: <World />,
    },
    {
      path: "unikCountry/:countryName",
      element: <Country />,
    },
    {
      path: "map/:commonName",
      element: <Map />,
    },
  ]);
  return (
    <>
      <div className="  bg-cyan-100">
        <RouterProvider router={allRoutes} />
      </div>
    </>
  );
}
