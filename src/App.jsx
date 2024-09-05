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
    document.querySelector("#submit-btn").disabled = true;
    document.querySelector("#submit-btn").innerText = "Loading...";
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
        }finally{
          document.querySelector("#submit-btn").disabled = false;
    document.querySelector("#submit-btn").innerText = "Search";

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
        }}
      >
        <article
          className="flex flex-col items-center min-h-[100vh] max-h-[100%] w-full py-10 px-5 g-3"
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        >
          <h1
            className="text-[50px] text-[#e5e5e5] font-bold text-center"
            style={{
              textShadow: "5px -1px 0px rgba(191,191,191,0.89)",
            }}
          >
            Weather App
          </h1>
          <div className="h-[100%] w-full mt-2 flex flex-col items-center justify-center">
            <form className="form w-full flex items-center justify-center gap-1">
              <input
                type="text"
                placeholder="Search for Weather"
                className="input-field lg:w-[60%] sm:w-[100%] rounded-md p-2 bg-[rgba(0,0,0,0)]"
                ref={userInput}
              />

              <button id="submit-btn"
                onClick={getUserInput}
                className="submit-btn btn btn-active btn-neutral"
              >
                Search
              </button>
            </form>
            <div className="weather-card-container flex flex-col lg:w-[70%] sm:w-[100%] gap-2 items-center justify-center mt-2 p-3">
              {weatherDataCollection.map((item, index) => (
                <div
                  key={index}
                  className="weather-card bg-[rgba(0,0,0,0.2)] px-[20px] py-2 rounded-md flex flex-col items-center justify-center text-[#ededed] lg:w-[450px] sm:w-[450px]"
                >
                  <div className="card-head-content flex flex-col items-center justify-center py-[10px]">
                    <img
                      src={item.current.condition.icon}
                      className="w-[150px]"
                      alt="icon"
                    />
                    <h1 className="text-[38px] font-bold">
                      {item.location.name}{" "}
                    </h1>
                    <h3 className="text-3xl font-bold m-0">
                      {item.current.temp_c}
                      <sup>o</sup>C
                    </h3>
                    <p className="text-[#f1f1f1] font-bold">
                      {item.current.condition.text}
                    </p>
                  </div>
                  <div className="card-body-content flex flex-col items-center justify-center w-[100%]">
                    <p className="border-style text-[#f1f1f1] text-[18px] text-center font-bold w-[100%] p-1">
                      <span className="text-[28px] px-5">
                        <i className="fa-solid fa-temperature-low"></i>
                      </span>
                      Feels Like : {item.current.feelslike_c}
                      <sup>o</sup>C
                    </p>
                    
                    <p className="border-style text-[#f1f1f1] text-[18px] text-center font-bold w-[100%] p-1">
                      <span className="text-[28px] px-5 text-[#a625259f]">
                        <i className="fa-solid fa-temperature-low"></i>
                      </span>
                      Heat Index : {item.current.heatindex_c}
                      <sup>o</sup>C
                    </p>
                    <p className="border-style text-[#f1f1f1] text-[18px] text-center font-bold w-[100%] p-1">
                      <span className="text-[28px] px-5 ">
                      <i className="fa-solid fa-wind"></i>
                      </span>
                      Heat Index : {item.current.wind_kph}kph
                    </p>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </article>
    </>
  );
}

export default App;
