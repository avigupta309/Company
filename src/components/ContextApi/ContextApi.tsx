/* eslint-disable react-refresh/only-export-components */
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";

interface userProps {
  userName: string;
  password: string;
  email: string;
  gender: string;
}
interface locationProps{
  lat:number;
  lon:number;
}

interface providerProps {
  children: React.ReactNode;
}

interface typeContext1 {
  user: userProps[] | undefined;
  setUser: (data: userProps) => void;
  logger: userProps | undefined;
  setLogger: (data: userProps) => void;
  location: locationProps|undefined;
  setLocation: (data: locationProps) => void;
}

export const ContextApi = createContext<typeContext1 | undefined>(undefined);

export const ContextProvider: React.FC<providerProps> = (props) => {
  const [location, setLocationInfo] = useState<locationProps>();
  const setLocation=(data:locationProps)=>{
    setLocationInfo(data)
  }
  // console.log(location)
  const [logger, setLoggerInfo] = useState<userProps>();
  const setLogger = (data: userProps) => {
    setLoggerInfo(data);
  };
  const [user, SetUserInfo] = useState<userProps[]>([
    {
      email: "avinashguptaa0.3@gmail.com",
      password: "avinash123",
      userName: "Avinash309",
      gender: "male",
    },
    {
      email: "prabej@gmail.com",
      password: "prabej321",
      userName: "MD.Prabej",
      gender: "male",
    },
  ]);

  useEffect(() => {
    const userData = Cookies.get("userData");
    if (userData) {
      SetUserInfo(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user.length > 1) {
      Cookies.set("userData", JSON.stringify(user), { expires: 8 });
    }
  }, [user]);

  const setUser = (data: userProps) => {
    SetUserInfo((prev) => [...prev, data]);
    console.log(data);
  };
  return (
    <ContextApi.Provider value={{ user, setUser, logger, setLogger,location,setLocation }}>
      {props.children}
    </ContextApi.Provider>
  );
};
