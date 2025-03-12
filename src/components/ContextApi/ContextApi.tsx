/* eslint-disable react-refresh/only-export-components */
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";

interface userProps {
  userName: string;
  password: string;
  email: string;
  gender:string;
}
interface providerProps {
  children: React.ReactNode;
}

interface typeContext1 {
  user: userProps[] | undefined;
  setUser: (data: userProps) => void;
  logger: userProps | undefined;
  setLogger: (data: userProps) => void;
}

export const ContextApi = createContext<typeContext1 | undefined>(undefined);

export const ContextProvider: React.FC<providerProps> = (props) => {
  const[logger,setLoggerInfo]=useState<userProps>()
  const setLogger=(data:userProps)=>{
    setLoggerInfo(data)
  }
  const [user, SetUserInfo] = useState<userProps[]>([
    {
      email: "avinashguptaa0.3@gmail.com",
      password: "avinash123",
      userName: "Avinash309",
      gender:"male",
    },
    {
      email: "prabej@gmail.com",
      password: "prabej321",
      userName: "MD.Prabej",
      gender:"male",
    }
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
    <ContextApi.Provider value={{ user, setUser,logger,setLogger }}>
      {props.children}
    </ContextApi.Provider>
  );
};
