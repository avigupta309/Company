import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Country } from "./Country";

interface worldProps {
  flags: { png: string };
  name: { common: string; official: string };
  languages: { [key: string]: string };
  capital: string[];
}

export const World: React.FC = () => {
  const [country, setCountry] = useState<worldProps[]>([]);
  const [searchCountry, setSearchCountry] = useState<string>("");
  const [openCountryList, setOpenCountryList] = useState<boolean>(false);
  const handleClick = (): void => {
    setOpenCountryList(true);
    // console.log(e);
  };

  function OnchangeFun(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchCountry(e.target.value);
  }

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all").then((response) => {
      response.json().then((data) => {
        console.log(data[0].flags.png);
        setCountry(data);
        console.log(country);
        console.log(data);
      });
    });
  }, []);

  const CountryList = country.map((val, index) => {
    return (
      <div
        className="card w-2xl shadow-2xl  flex flex-col items-start w-3xs"
        key={index}
        style={{ margin: "3px", fontSize: "clamp(0.5rem, 2vw, 3rem)" }}
      >
        <h1>{index + 1}</h1>
        <img className="h-20" src={val.flags.png} alt="" />
        <i>Full Name - {val.name.official}</i>
        <p>Capital - {val.capital}</p>
        <Link to={`/unikCountry/${val.name.common}`}>
          <button className="btn btn-wide absolute bottom-0  text-black bg-gray-50">
            {val.name.common}
          </button>
        </Link>
      </div>
    );
  });

  if (openCountryList) {
    console.log(searchCountry);
    console.log("opn");
    return <Country />;
  }

  return (
    <>
      <div className="bg-fuchsia-400 h-full w-full ">
      <div className="w-full bg-red-500 ">
          <label className="input h-12 bg-white text-black  relative top-[2rem] left-[2rem] mb-[3rem]">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => {
                OnchangeFun(e);
              }}
              type="search"
              required
              placeholder="Search"
            />

            <button
              onClick={handleClick}
              className="btn btn-dash btn-success absolute right-0"
            >
              <Link to={`/unikCountry/${searchCountry}`}>Search</Link>
            </button>
          </label>
          </div>
        <div
          className="main h-full w-full grid   gap-4 bg-cyan-600 gap-y-10"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {CountryList}
        </div>
      </div>
    </>
  );
};
