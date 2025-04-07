import React, { useContext } from "react";
import { ContextApi } from "../ContextApi/ContextApi";
import { Link } from "react-router-dom";
export const Dashboard: React.FC = () => {
  const currentTime=new Date().toLocaleDateString();
  
  const receiveData = useContext(ContextApi);
  if (!receiveData?.user && receiveData?.user == undefined) {
    return;
  }
  return (
    <>
      <div
        className="hero text-black min-h-screen relative"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="profile-blur h-28 text-green-600 bg-transparent absolute top-4 left-4 backdrop-blur-xs flex flex-col">
          <p>
            <strong>Name :</strong>
            <span className="text-xl text-yellow-400 inline">
              {receiveData.logger?.userName}
            </span>
          </p>
          <p>
            <strong>Gender :</strong>
            <span className="text-xl text-yellow-400 inline">
              {receiveData.logger?.gender}
            </span>
          </p>
          <p>
            <strong>Visiting Time :</strong>
            <span className="text-xl text-yellow-400 inline">
             {currentTime}
            </span>
          </p>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              {receiveData.logger?.gender == "male" ? "Sir," : "Maam,"}
              {receiveData.logger?.userName}
            </h1>
            <p className="mb-5 text-xl ">
              Welcome to Imagination World , your gateway to discovering
              fascinating facts, rich histories, and virtual experiences of
              countries around the world. Select a country and embark on a
              journey filled with intriguing insights, cultural highlights, and
              a virtual exploration like never before. Whether you're a travel
              enthusiast or just curious, our platform brings the world to
              you—one country at a time!
            </p>
            <Link to={"/country"}>
              <button className="btn btn-primary">
                Explore the World Virtually!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
