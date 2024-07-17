import React, { useContext, useEffect, useState } from "react";
import MyContext from "./Context";
import { Link } from "react-router-dom";
const Home = () => {
  // const { localData2 } = useContext(MyContext);

  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  //   i am mapping through the countries regions/continent then i render in inside select to filter by continent
  // the new Set wont make a continent to appear twice and the "all" would return all the countries when clicked on
  const continent = [
    "all",
    ...new Set(allCountries.map((item) => item.region)),
  ];

  //   filtering by region
  const filterByRegion = (region) => {
    if (region == "all" || region == "") {
      setCountries(allCountries);
      return;
    }

    const newRegions = allCountries.filter((item) => item.region == region);
    console.log(newRegions.length + "countries found ");
    setCountries(newRegions);
  };

  //   loading for fetching countries
  const [loading, setLoading] = useState(false);

  //   fetching the countries
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAllCountries(data);
        setLoading(false);
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error.response);
      }
    };

    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [notFount, setNotFound] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    const matchingItems = e.target.value.trim()
      ? allCountries.filter((item) =>
          item.name.common.toLowerCase().includes(e.target.value.toLowerCase())
        )
      : allCountries;

    setNotFound(
      matchingItems.length === 0 && e.target.value
        ? "ooops! no result for " + e.target.value
        : "" 
    );
    //
    // if(matchingItems.length === 0 && e.target.value!==""){
    //   setNotFound( "ooops! no result for " + e.target.value)
    // }
    setCountries(matchingItems);
  };
  return (
    <div className="py-5 px-8 grid gap-5">
      <div className="md:flex items-center justify-between gap-5">
        <input
          type="text"
          className="w-full px-2 py-2 rounded font-bold mb-3 md:mb-0"
          placeholder="search for a country"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div>
          <select
            onClick={(e) => {
              console.log(e.target.value);
              filterByRegion(e.target.value);
            }}
            name=""
            id=""
            className="border border-gray-300 rounded-lg p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">filter by continent </option>
            {continent?.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {" "}
                  {item}{" "}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {loading && (
        <center className="h-screen flex items-center justify-center text-white">
          {" "}
          <p> Getting countries.... </p>
        </center>
      )}

      {notFount && (
        <center className="h-screen flex items-center justify-center text-white">
          <p>
            {" "}
            {notFount} 
          </p>
        </center>
      )}
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
        {countries.map((item) => {
          return (
            <Link
              key={item.flag}
              to={"/Home/" + item.flag}
              className=" shadow font-bold shrink-0 bg-gray-800 rounded-lg mb-4">
              <div>
                <img src={item.flags.png} alt="" className="rounded-lg w-full" />
              </div>

              {/* <div>
                {item.coatOfArms=={}? <p className="text-red-400">no coat of arm for this country </p> :  <img src={item.coatOfArms.png} alt="" className="rounded-lg" />  }
                
              </div> */}

              <div className="p-5 grid gap-3">
                <h1 className="text-xl">{item.name.common} </h1>

                <div>
                  <p className="text-sm">Capital: {item.capital}</p>

                  <p className="text-sm">Region: {item.region} </p>

                  <p className="text-sm">
                    Population:{" "}
                    {new Intl.NumberFormat().format(item.population)}{" "}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
