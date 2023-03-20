import React, { useContext } from "react";
import Card from "./Card";
import Loader from "./Loader";
import Temperature from "./Temperature";
import AppContext from "../provider/appContext";
import Weather from "./Weather";

function Forecast() {
  const { app } = useContext(AppContext);

  if (!app.weather) {
    return <Loader />;
  }

  const { daily } = app.weather;

  const colLeftStyle = {
    background: "#19202d",
    color: "#fff",
  };
  const colRightStyle = {
    background: "#232b39",
    color: "#fff",
  };

  return (
    <section className="container">
      <div className="col-left" style={app.isDark ? colLeftStyle : null}>
        <Weather />
      </div>
      <div
        className="col-right-forecast"
        style={app.isDark ? colRightStyle : null}
      >
        <h2 className="heading">This Week's Forecast</h2>
        <div className="forecast-container">
          {daily.map((weather, index) => {
            // Create newDate obj
            let date = new Date(weather.dt * 1000);
            // Formatting date, Internationalization, DateTimeFormat
            const dayFormatter = Intl.DateTimeFormat([], {
              weekday: "long",
              timeZone: weather.timezone,
            });

            return (
              <Card key={index} className="forecast-card">
                <div className="forecast-day">{dayFormatter.format(date)}</div>
                <img
                  src={`/weather_icons/${weather.weather[0].icon}.png`}
                  alt="icon"
                  width={100}
                />
                <div className="forecast-description">
                  {weather.weather[0].description}
                </div>
                <div className="minmax-temp">
                  <Temperature temperature={weather.temp.max} />°
                  <span>
                    <Temperature temperature={weather.temp.min} />°
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Forecast;
