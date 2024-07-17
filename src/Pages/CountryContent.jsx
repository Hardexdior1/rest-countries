import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CountryContent = () => {
  const { flag } = useParams();
  console.log(flag);

  const [countries, setCountries] = useState([]);
  let data = countries.find((item) => item.flag == flag);
  console.log("countryInformation", data);
  const [toggleCoatOfArm, setToggleCoatOfArm] = useState(false);

  let currency = "";
  let currencySymbol = "";
  let language = "";

  if (data) {
    console.log("countryInformation", data);
    const currencyKey = Object.keys(data.currencies)[0]; // This will get 'XOF'
    currency = data.currencies[currencyKey].name;
    currencySymbol = data.currencies[currencyKey].symbol;

    const languageKey = Object.keys(data.languages)[0]; // Gets the first language key
    language = data.languages[languageKey];
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountries(data);
        setToggleCoatOfArm(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-5 my-10 md:mx-10">
      {data && (
        <div>
          <div className="shadow-lg font-bold shrink-0 bg-gray-800 rounded-lg mb-4 p-4 grid md:grid-cols-2 gap-5 items-center justify-between text-white">
            <div className="w-full">
              {toggleCoatOfArm ? (
                <img
                  src={data.coatOfArms.png}
                  alt="coat of arm"
                  className="rounded-lg w-full h-full border"
                />
              ) : (
                <img
                  src={data.flags.png}
                  alt="flag"
                  className="rounded-lg w-full"
                />
              )}
            </div>

            <div className="grid gap-6">
              <h1 className="text-3xl">{data.name.common}</h1>

              <div className="grid gap-4 md:grid-cols-2  items-top text-sm">
                <div className="grid gap-2 ">
                  <p>Capital: {data.capital}</p>
                  <p>Region: {data.region}</p>
                  <p>Language: {language}</p>

                  <p>
                    Population:{" "}
                    {new Intl.NumberFormat().format(data.population)}
                  </p>
                </div>

                <div className="grid gap-2">
                  <p> Native name: {data.name.official} </p>
                  <p> Sub region: {data.subregion} </p>
                  <p> Currency name: {currency} </p>
                  <p> Currency symbol: {currencySymbol} </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setToggleCoatOfArm(!toggleCoatOfArm);
                }}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
                {toggleCoatOfArm?"show flag":"show coat of arm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryContent;
