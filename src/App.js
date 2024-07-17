import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, createContext } from "react"
import { useNavigate } from "react-router-dom";
import Home from "./Component/Home";
import MyContext from "./Component/Context";
import CountryContent from "./Pages/CountryContent";
function App() {
  
  


  const localData = { user: 'John Doe', isLoggedIn: true };
  const localData2 = { user: 'Quwam', isLoggedIn: true };

  const contextValue={localData,localData2}


  const [tripInfo, setTripInfo] = useState([]);
  console.log(tripInfo);

  const [date, setDate] = useState("");

  // getting trip info to save to localStorage
  useEffect(() => {
    const savedTrip = localStorage.getItem("tripInfo");
    if (savedTrip) {
      const parsedTrip = JSON.parse(savedTrip);
      setTripInfo(parsedTrip);
    }
  }, []);

  // trip info initial object
  const travelInfo = {
    id: new Date(),
    date: date,
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  // save travel info
  const saveTravelInfo = () => {
    if (date.trim() == "") {
      console.log("=>>>" + " pick a date");
    } else {
      setTripInfo((prev) => {
        localStorage.setItem("tripInfo", JSON.stringify([...prev, travelInfo]));
        return [...prev, travelInfo];
      });
    }
  };

  // delete trip
  const deleteTrip = (id) => {
    const newTrip = tripInfo.filter((item) => item.id !== id.id);
    console.log("deleted =>> " + id.id);
    setTripInfo(newTrip);
    localStorage.setItem("tripInfo", JSON.stringify(newTrip));
  };

  
  return (
    <section className="App">
      {/* <div className="p-6 grid gap-6">
        <div>
          <input
            type="date"
            className="border w-1/2 py-3"
            value={date}
            onChange={handleChangeDate}
          />
        </div>

        <button
          onClick={saveTravelInfo}
          className="border text-bold  py-4 rounded">
          {" "}
          continue{" "}
        </button>

        <div className="grid gap-4">
          {tripInfo.map((info) => {
            return (
              <div key={info.date} className="border rounded p-5">
                <h1> {info.date} </h1>
                <button
                  className="bg-white text-red-400 font-bold px-4 py-2 rounded border cursor-pointer"
                  onClick={() => {
                    deleteTrip(info);
                  }}>
                  {" "}
                  delete{" "}
                </button>
              </div>
            );
          })}
        </div>
      </div> */}

      <MyContext.Provider value={contextValue}>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home/:flag" element={<CountryContent />} />

          </Routes>

        </BrowserRouter>
      </MyContext.Provider>
    </section>
  );
}

export default App;
