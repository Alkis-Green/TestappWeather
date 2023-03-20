import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import CityInput from "../components/CityInput";
import Weather from "../components/Weather";
import Highlights from "../components/Highlights";
import Hourly from "../components/Hourly";
import Loader from "../components/Loader";

import "../App.css";

import geoCoords from "../utils/geoCoords";
import getWeather, {
  getCityCoords,
  getCityName,
} from "../services/weatherService";

function Home({ app, dispatchApp }) {
  //
  //
  //

  useEffect(() => {
    // Automated theme based on current hour
    // If Hour more than 18:00 (afternoon) or less than 7:00 (morning)
    const date = new Date();
    const hour = date.getHours();
    if (hour > 18 || hour < 7) {
      dispatchApp({ type: "DARK", payload: true });
    }
  }, [dispatchApp]);

  useEffect(() => {
    (async () => {
      // Get user's position
      const { longitude: lon, latitude: lat } = await geoCoords();
      // If user's position true
      if (lon && lat) {
        //Get user's position coordinates, city, country
        const { name, country } = await getCityName(lon, lat);
        dispatchApp({ type: "GEO_COORDS", payload: { lon, lat } });
        dispatchApp({ type: "CITY", payload: name });
        dispatchApp({ type: "COUNTRY", payload: country });
      }
    })();
  }, [dispatchApp]);

  useEffect(() => {
    (async () => {
      const { lon, lat, country } = await getCityCoords(app.city);
      dispatchApp({ type: "GEO_COORDS", payload: { lon, lat } });
      dispatchApp({ type: "COUNTRY", payload: country });
    })();
  }, [app.city, dispatchApp]);

  useEffect(() => {
    (async () => {
      // get weather based in user's position
      const data = await getWeather(app.geoCoords.lon, app.geoCoords.lat);
      dispatchApp({ type: "WEATHER", payload: data });
      // Determine if it's day or night based on user's location remomving the 12hours prop
      const formatter = Intl.DateTimeFormat([], {
        hour12: false,
        hour: "numeric",
        timeZone: data.timezone,
      });

      //determine whether it is day or night based on the sunrise and sunset
      const localTime = parseInt(
        formatter
          // convert value of data.current.dt ( is in seconds) into a Date object
          .format(new Date(data.current.dt * 1000))
          //remove all alphabetical characters (both uppercase and lowercase) from a string
          .replace(/[A-Za-z]/gi, "")
      );

      const sunset = parseInt(
        formatter
          .format(new Date(data.current.sunset * 1000))
          .replace(/[A-Za-z]/gi, "")
      );

      const sunrise = parseInt(
        formatter
          .format(new Date(data.current.sunrise * 1000))
          .replace(/[A-Za-z]/gi, "")
      );

      // setTheme upon localTime
      if (localTime > sunset || localTime < sunrise) {
        dispatchApp({ type: "DARK", payload: true });
      } else {
        dispatchApp({ type: "DARK", payload: false });
      }
    })();
  }, [app.geoCoords.lat, app.geoCoords.lon, dispatchApp]);

  useEffect(() => {
    if (app.isDark) {
      document
        .querySelector(":root")
        .style.setProperty("--placeholder-color", "#8f94af");
    } else {
      document
        .querySelector(":root")
        .style.setProperty("--placeholder-color", "#323232");
    }
  }, [app.isDark]);

  const colLeftStyle = {
    background: "#19202d",
    color: "#fff",
  };
  const colRightStyle = {
    background: "#232b39",
    color: "#fff",
  };

  if (!app.weather) {
    return <Loader />;
  }

  return (
    <section className="container">
      <div className="col-left" style={app.isDark ? colLeftStyle : null}>
        <CityInput />
        <Weather />
      </div>
      <div className="col-right" style={app.isDark ? colRightStyle : null}>
        <div className="top-header">
          <h2 className="heading">Today</h2>
        </div>
        <Hourly />
        <h2 className="heading">Today's Highlights</h2>
        <Highlights />
        <h2 className="heading">
          <Link className="link" to="/forecast">
            See Forecast
          </Link>
        </h2>
      </div>
    </section>
  );
}

export default Home;
