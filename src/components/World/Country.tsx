import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface countryProps {
  name: { common: string; official: string };
  population: number;
  region: string;
  flags: { png: string };
  independent: boolean;
  landlocked: boolean;
  unMember: boolean;
}

export const Country: React.FC = () => {
  const [countryData, setCountryData] = useState<countryProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { countryName } = useParams<{ countryName: string }>();
  useEffect(() => {
    if (countryName) {
      console.log(countryName);
      fetch(`https://restcountries.com/v3.1/name/${countryName}`).then(
        (response) => {
          response.json().then((data) => {
            console.log(data);
            setCountryData(data);
            setLoading(!loading);
          });
        }
      );
    }
  }, [countryName]);

  return (
    <>
      {loading ? (
        countryData.map((val, index) => {
          return (
            <div
              key={index}
              className="p-5 text-black w-full h-full bg-gray-100"
            >
              <h1 className="text-3xl font-bold mb-4">{}</h1>
              <img src={val.flags.png} className="h-32 mb-4" />
              <p className="text-2xl font-medium">{val.name.common}</p>

              <div className="space-y-2">
                <p>
                  <strong>Official Name:</strong>
                  {val.name.official}
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
                  <strong>Independent:</strong> {val.independent ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Landlocked:</strong> {val.landlocked ? "Yes" : "No"}
                </p>
                <p>
                  <strong>UN Member:</strong> {val.unMember ? "Yes" : "No"}
                </p>
              </div>
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
    </>
  );
};

