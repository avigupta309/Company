import React, { useContext } from "react";
import { ContextApi } from "../ContextApi/ContextApi";
export const Dashboard: React.FC = () => {
  const receiveData=useContext(ContextApi);
  if(!receiveData?.user && receiveData?.user==undefined){
    return
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
       <div className="profile-blur h-28 w-28 bg-transparent absolute top-4 left-4 backdrop-blur-xs flex flex-col">
        <p>Name -{receiveData.logger?.userName} </p>
       
       </div>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{receiveData.logger?.gender=="male"?'Sir,':'Maam,'}{receiveData.logger?.userName}</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};
