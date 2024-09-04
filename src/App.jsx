import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";
// import Weathercard from "./components/Weathercard";
function App() {
  const userInput = useRef();
  const [userSearch, setUserSearch] = useState("");
  const [weatherDataCollection, setWeatherDataCollection] = useState([]);
  const getUserInput = (evt) => {
    evt.preventDefault();
    const inputVal = userInput.current.value;
    setUserSearch(inputVal);

    userInput.current.value = "";
  };

  useEffect(() => {
    const apiCallhandler = async (search) => {
      if (search != "") {
        try {
          const res = await axios(
            `https://api.weatherapi.com/v1/current.json?key=f442f652b1cb44c59f2173112240409&q=${search}&aqi=no`
          );

          const data = res.data;
          setWeatherDataCollection((prev) => {
            prev.unshift(data);
            return [...prev];
          });
          console.log(weatherDataCollection);
        } catch (error) {
          console.log("error===>", error);
        }
      } else {
        console.log("User Search is empty");
      }
    };
    apiCallhandler(userSearch);
  }, [userSearch]);

  return (
    <>
      <article
        style={{
          backgroundImage: "url('../public/app-bg-img.gif')",
          backgroundSize: "cover",
          backgroundRepeat: "noRepeat",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        className="flex flex-col items-center justify-center p-10 g-3"
      >
        <h1
          className="text-[50px] text-[#e5e5e5] font-bold text-center"
          style={{
            textShadow: "5px -1px 0px rgba(191,191,191,0.89)",
          }}
        >
          Weather App
        </h1>
        <div className="h-[100vh] w-full mt-2">
          <form className="form w-full flex items-center justify-center gap-1">
            <input
              type="text"
              placeholder="Search for Weather"
              className="input-field lg:w-[60%] sm:w-[100%] rounded-md p-2 bg-[rgba(0,0,0,0)]"
              ref={userInput}
            />

            <button
              onClick={getUserInput}
              className="submit-btn btn btn-active btn-neutral"
            >
              Search
            </button>
          </form>
        <div>
          {weatherDataCollection.map((item , index) => (
           <div key={index}>
            Weather Card {index}
           </div>
          ))}
        </div>
        </div>
      </article>
    </>
  );
}

export default App;
