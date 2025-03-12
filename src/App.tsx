import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { ForgetPassword } from "./components/Login/Forget";
import { Signup } from "./components/Login/SignUp";
import { World } from "./components/World/World";
import { Country } from "./components/World/Country";

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
        path:'Signup',
        element:<Signup/>
    },
    {
      path:'country',
      element:<World/>
    },
    {
      path:'unikCountry/:countryName',
      element:<Country/>
    },
  

  ]);
  return(
     <>
      <div className="w-screen h-screen bg-blue-600  flex justify-center items-center">
      <RouterProvider router={allRoutes}/>
      </div>
      
     </>
  )
}
