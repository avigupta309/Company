import React, { useEffect, useState } from "react";

export const World: React.FC = () => {
  const[country,setCountry]=useState()
  useEffect(()=>{

    fetch("https://restcountries.com/v3.1/all").then((response)=>{
      response.json().then((data)=>{
        console.log(data[0].flags.png)
        setCountry(data)
        console.log(country)
      })
    })

  },[])


  return (
  <>
 
  </>
  )
};
