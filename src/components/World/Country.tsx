import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContextApi } from "../ContextApi/ContextApi";
interface countryProps {
  name: { common: string; official: string };
  population: number;
  region: string;
  flags: { png: string };
  independent: boolean;
  landlocked: boolean;
  unMember: boolean;
  idd: { root: string; suffixes: string[] };
  startOfWeek: string;
  capital: string[];
  coatOfArms: { png: string };
  borders: string[];
  extract: string;
}

export const Country: React.FC = () => {
  const receiveData = useContext(ContextApi);
  const [countryData, setCountryData] = useState<countryProps[]>([]);
  const [wekipedia, setWekepedia] = useState<countryProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const { countryName } = useParams<{ countryName: string }>();
  useEffect(() => {
    if (countryName) {
      fetch(`https://restcountries.com/v3.1/name/${countryName}`).then(
        (response) => {
          response.json().then((data) => {
            setCountryData(data);
            setLoading(!loading);
          });
        }
      );
      fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`
      ).then((response) => {
        response.json().then((data) => {
          setWekepedia(data);
          console.log(data.coordinates);
          receiveData?.setLocation(data.coordinates);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryName]);

  return (
    <>
      <div className="w-full grid h-full">
        <div className="header h-[5rem] bg-fuchsia-400 fixed w-full top-0 flex items-center justify-center">
          <p className="text-2xl">Selection Country</p>
        </div>
        <br />
        <br />
        {loading ? (
          countryData.map((val, index) => {
            return (
              <div
                key={index}
                className="p-5 text-black bg-blue-400 shadow-2xl mb-10"
              >
                <img src={val.flags.png} className="h-32 mb-4" />
                <p className="text-2xl font-medium">{val.name.common}</p>

                <div className="space-y-2">
                  <p>
                    <strong>Official Name:</strong>
                    {val.name.official}
                  </p>
                  <p>
                    <strong>Capita City:</strong>
                    {val.capital}
                  </p>
                  <p>
                    <strong>Population:</strong>
                    {val.population}
                  </p>
                  <p>
                    <strong>Region:</strong>
                    {val.region}
                  </p>
                  <p>
                    <strong>Independent:</strong>{" "}
                    {val.independent ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Landlocked:</strong> {val.landlocked ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>UN Member:</strong> {val.unMember ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Borders Share With: </strong>
                    {val.borders?.join(", ") || "No borders"}
                  </p>
                  <p>
                    <strong>Call Code:</strong>
                    {val.idd.root} {val.idd.suffixes}
                  </p>
                  <p>
                    <strong>Start Of Week:</strong> {val.startOfWeek}
                  </p>
                  <p className="bg-cyan-200 ">
                    <strong className="text-xl">Start Of Week:</strong>{" "}
                    {wekipedia?.extract}
                  </p>
                  <strong>Logo Of {val.name.common} Army</strong>
                  <img src={val.coatOfArms.png} style={{ height: "10rem" }} />
                </div>
                <Link to={"/map"}>
                  <button className="btn btn-primary">Explore the Map!</button>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="h-full w-full bg-white">
            <img
              className=""
              src="https://cdn.dribbble.com/userupload/26649674/file/original-f2e1bd8730d240a4c24f847396f096db.gif"
            />
          </div>
        )}
      </div>
    </>
  );
};
