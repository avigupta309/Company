import { EyeIcon, EyeOff } from "lucide-react";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ContextApi } from "../ContextApi/ContextApi";
import { Dashboard } from "../Dashboard/Dashboard";
import { toast, ToastContainer } from "react-toastify";
interface UserProps {
  password: string;
  email: string;
  userName: string;
  gender: string;
}

export const Login: React.FC = () => {
  const [eye, setEye] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>();
  const receiveData = useContext(ContextApi);
  const submit: SubmitHandler<UserProps> = (data: UserProps) => {
    if (!receiveData || !receiveData.user) {
      console.error("Nothing in userData !");
      return;
    }

    const matchUser = receiveData.user.find(
      (user: UserProps) =>
        user.email == data.email && user.password == data.password
    );
    if (matchUser) {
      setIsLogin(!isLogin);
      receiveData.setLogger(matchUser);
      toast.error("Login SucessFul");
      console.log("sucessful login");
      console.log(data);
      console.log(receiveData.user);
      console.log(matchUser);
    } else {
      console.log("Login Failed");
      toast.error("Sorry Sir/Maam You Have Enter Wrong Password");
    }
    console.log(receiveData?.user);
    console.log(data);
  };

  if (isLogin) {
    return <Dashboard />;
  }

  return (
    <div>
      <ToastContainer />
      {/* Login Box */}
      <div className="bg-white p-8 text-black rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-emerald-600">
          Login
        </h2>
        <form onSubmit={handleSubmit(submit)}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", { required: "Must Enter Valid Email" })}
              type="email"
              className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          {/* Password Input */}
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between">
            <input
              {...register("password", {
                required: "At Least More Than 8 Digit",
              })}
              type={eye ? "text" : "password"}
              className=" border-none outline-none w-2xs"
              placeholder="Enter your password"
            />
            <div
              onClick={() => {
                setEye(!eye);
              }}
              className="icon"
            >
              {eye ? (
                <EyeOff height={25} color="black" />
              ) : (
                <EyeIcon height={25} color="black" />
              )}
            </div>
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white mt-3 py-2 px-4 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        {/* Forgot Password and Create New Account Links */}
        <div className="mt-4 text-center flex items-center justify-center">
          <Link to={"/forget"}>
            <p className="text-sm text-blue-500 hover:text-blue-700">
              Forgot Password?
            </p>
          </Link>
          <span className="mx-2 text-gray-400">|</span>
          <Link to={"/Signup"}>
            <p className="text-sm text-blue-500 hover:text-blue-700">Signup</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
