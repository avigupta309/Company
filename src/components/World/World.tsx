import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Country } from "./Country";

interface worldProps {
  flags: { png: string };
  name: { common: string; official: string };
  languages: { [key: string]: string };
  capital?: string[];
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
        setCountry(data);
      });
    });
  }, []);

  const CountryList = country.map((val, index) => {
    return (
      <div
        className="card text-black shadow-2xl bg-amber-200 flex  justify-center items-center gap-5 "
        key={index}
        style={{ margin: "3px", fontSize: "clamp(0.5rem, 2vw, 3rem)" }}
      >
        <h1>{index + 1}</h1>
        <img className="h-20" src={val.flags.png} alt="image" />
        <p>
          {" "}
          <strong> Full Name</strong> - <i> {val.name.official}</i>
        </p>
        <p>Capital - {val.capital}</p>
        <Link to={`/unikCountry/${val.name.common}`}>
          <button className="btn btn-wide bottom-0 relative w-[20rem] text-black bg-gray-50">
            {val.name.common}
          </button>
        </Link>
      </div>
    );
  });

  if (openCountryList) {
    return <Country />;
  }

  return (
    <>
      <div className="  h-full w-full ">
        <div className="w-full bg-red-500 flex flex-col md:flex-row lg:flex-row items-center justify-evenly">
          <div className="flex items-center justify-center">
            <img src="https://i.pinimg.com/originals/32/88/2d/32882dbcd4424eb8e814ce8e62e68361.gif" className="h-20" alt="" />
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
              className="w-52"
            />

            <button
              onClick={handleClick}
              className="btn btn-dash btn-success absolute right-0"
            >
              <Link to={`/unikCountry/${searchCountry}`}>Search</Link>
            </button>
          </label>
          </div>
          <h1 className="  text-xl mr-5 text-white">
            ✈️🌏Your global journey starts here!
          </h1>
        </div>
        <div
          className="main grid  p-3 gap-y-3"
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
