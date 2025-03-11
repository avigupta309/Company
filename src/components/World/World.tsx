import axios from 'axios'
import React from 'react'

export const World:React.FC=()=>{
    axios.get("https://restcountries.com/v3.1/all")
    .then(response => {
      console.log(response.data); // Logs the list of countries
    })
   
    return(
        <>
        
        </>
    )
}