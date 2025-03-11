import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otpBtn, setOtpBtn] = useState<boolean>(false);

  function buttonFunction(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    setOtpBtn(!otpBtn);
    setEmail("");
    handleClick();
  }

  const [time, setTime] = useState(10);
  const [run, setRun] = useState<boolean>(false);

  function handleClick() {
    setTime(10);
    setRun(true);
  }

  useEffect(() => {
    if (run) {
      if (time > 0) {
        const timer = setTimeout(() => setTime(time - 1), 1000);
        console.log(time);
        return () => clearTimeout(timer);
      }
    }
  }, [run, time]);

  return (
    <div>
      {/* Login Box */}
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-emerald-600">
          Reset Pasword
        </h2>
        <form>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {otpBtn ? "OTP" : "Email"}
            </label>
            <input
              type={otpBtn ? "number" : "text"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={otpBtn ? "Enter OTP" : "Enter Email Adress"}
            />
          </div>
          <div className="time">
            {otpBtn ? <p> {`Time Left : ${time}`}</p> : "Send OTP"}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            onClick={(e) => {
              buttonFunction(e);
            }}
            className="w-full bg-emerald-500 text-white mt-3 py-2 px-4 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {otpBtn ? "Verify" : "Send OTP"}
          </button>
          {otpBtn ? (
            <p>We'll send an OTP to your email for verification.</p>
          ) : (
            ""
          )}

          <div className="mt-4 text-center flex items-center justify-center">
            <Link to={"/"}>
              <p className="text-sm text-blue-500 hover:text-blue-700">
                Back To Login
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
