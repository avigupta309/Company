import React, { useContext, useState } from "react";
import { ContextApi } from "../ContextApi/ContextApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { EyeIcon, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
interface userProps {
  userName: string;
  password: string;
  email: string;
  gender:string;
}

export const Signup: React.FC = () => {
  const receiveData = useContext(ContextApi);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userProps>();
  const [eye, setEye] = useState<boolean>(false);
  const subMit: SubmitHandler<userProps> = (data: userProps) => {
    console.log(data);
    receiveData?.setUser(data);
    setTimeout(()=>{
      reset();
      toast.success("You Have Sucessfully Create Account On .... Mr/Ms"+data.userName)
    },1500)
    // setLoggerId(data)
  };
  return (
    <div className="w-96 mx-auto text-black p-6 border rounded-lg shadow-lg  bg-white">
      <ToastContainer/>
      <h2 className="text-2xl font-bold mb-6 text-center text-emerald-600">
        Signup
      </h2>
      <form onSubmit={handleSubmit(subMit)}>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email", { required: "Must Enter Valid Email" })}
            type="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        {/* User Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            User Name
          </label>
          <input
            {...register("userName", { required: "Enter Your User Name !" })}
            type="text"
            name="userName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your User Name"
          />
          {errors.userName && (
            <span className="text-red-500">{errors.userName.message}</span>
          )}
        </div>
        {/* Password */}
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between">
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
        <br />

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <div className="mt-1 space-x-4">
            <label className="inline-flex items-center">
              <input
              {...register("gender")}
                type="radio"
                name="gender"
                value="male"
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
              {...register("gender")}
                type="radio"
                name="gender"
                value="female"
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            name="country"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Country</option>
            <option value="Nepal">Nepal</option>
            <option value="USA">USA</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
        <div className="mt-4 text-center flex items-center justify-center">
          <Link to={"/"}>
            <p className="text-sm text-blue-500 hover:text-blue-700">
              Back To Login
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};
