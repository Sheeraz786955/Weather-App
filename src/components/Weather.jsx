import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import { useActionState, useEffect, useState } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loader, setLoader] = useState(false);
  const mainCity = "Vehari";
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };
  useEffect(() => {
    HundleData(mainCity);
  }, []);

  const HundleForm = (prevData, formData) => {
    const city = formData.get("city");
    if (!city) {
      alert("⚠️ Please enter a city name.");
      return null; // stop execution if empty
    }
    return city;
  };
  const [data, action, pending] = useActionState(HundleForm);
  useEffect(() => {
    if (data) HundleData(data);
  }, [data]);

  const HundleData = async (city) => {
    setLoader(true);
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      (city ? city : mainCity) +
      "&units=metric&appid=912c5c250fa7ec749baf4fbdbf2c7cdb";

    let response = await fetch(url, {
      method: "Get",
    });
    response = await response.json();
    let detailedData = response;
    if (detailedData.cod == "404") {
      alert(detailedData.message);
      setLoader(false);
      return;
    }
    setWeatherData({
      temperature: Math.round(detailedData.main.temp),
      humidity: detailedData.main.humidity,
      wind: detailedData.wind.speed,
      cityName: detailedData.name,
      // icon:icon
      icon: allIcons[detailedData.weather[0].icon],
      desce: detailedData.weather[0].description,
    });

    setLoader(false);
  };

  const desce = weatherData?.desce || "";
  const desce1 = desce
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <>
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 w-96 ">
          <div className="mx-5 my-10">
            <form action={action}>
              <div className="flex justify-center gap-2">
                <div>
                  <input
                    className="bg-white mb-1 text-inherit w-56 rounded-3xl p-2.5"
                    type="text"
                    name="city"
                    placeholder="Search City...."
                    disabled={pending}
                  />
                </div>
                <div>
                  <button className="bg-white rounded-full p-[3.5px] hover:bg-sky-300 cursor-pointer">
                    <i className="fa-solid fa-magnifying-glass text-3xl p-1 pr-1 hover:text-shadow-sky-900"></i>
                  </button>
                </div>
              </div>
            </form>
            <div className="w-40 m-auto my-5">
              <img className=" w-100" src={weatherData?.icon || clear} alt="" />
            </div>
            {loader ? (
              <h1
                type="button"
                className=" my-24 text-3xl text-center text-white font-bold"
                disabled
              >
                Loading....
              </h1>
            ) : (
              <div>
                <h1 className=" text-white text-7xl font-medium text-center">
                  {weatherData?.temperature}
                  <sup>o</sup>
                  <span className=" text-6xl">C</span>
                </h1>
                <h1 className=" text-center text-white font-medium text-2xl my-2">
                  {desce1}
                </h1>
                <h1 className=" text-center text-white font-medium text-3xl my-5">
                  {weatherData?.cityName}
                </h1>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 align-items-center mt-8">
              <div className=" flex gap-2 justify-center">
                <div>
                  <i className="fa-solid fa-wind text-4xl text-white"></i>
                </div>
                <div className="text-white font-medium">
                  <h1>{weatherData?.wind} Km/h</h1>
                  <h1>Wind</h1>
                </div>
              </div>
              <div className=" flex gap-2 justify-center">
                <div>
                  <i className="fa-solid fa-water text-4xl text-white"></i>
                </div>
                <div className="text-white font-medium">
                  <h1>{weatherData?.humidity} %</h1>
                  <h1>Humidity</h1>
                </div>
              </div>
            </div>
          </div>
          <h1 className=" text-center text-white pb-10">
            Built and Design By{" "}
            <a className=" font-bold text-lg cursor-pointer">Sheeraz Ahmad</a>
          </h1>
        </div>
      </div>
    </>
  );
}
export default Weather;
