import { useContext, useRef } from "react";
import AppContext from "../provider/appContext";
import { getCityName } from "../services/weatherService";
import geoCoords from "../utils/geoCoords";

function CityInput() {
  const input = useRef();

  const {
    app: { isDark },
    dispatchApp,
  } = useContext(AppContext);

  let time;

  return (
    <div className="input-group">
      {/* Gets user's location,
      by clicking on a location icon. 
      It calls the geoCoords and getCityName functions 
      to get the coordinates and city name respectively */}
      <span
        onClick={async () => {
          const coords = await geoCoords();
          dispatchApp({
            type: "GEO_COORDS",
            payload: { lon: coords.longitude, lat: coords.latitude },
          });
          const { country, name } = await getCityName(
            coords.longitude,
            coords.latitude
          );
          dispatchApp({ type: "COUNTRY", payload: country });
          dispatchApp({ type: "CITY", payload: name });
          input.current.value = "";
        }}
        style={isDark ? { background: "#37435a" } : null}
      >
        <i
          className="fa-solid fa-location-crosshairs location-icon"
          style={isDark ? { color: "#FFFFFF" } : null}
        ></i>
      </span>
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      {/* user searches for places by city name. 
      The "CITY" action is dispatched with the value of the input field as its payload, 
      and then it can then be used to make a request to the API */}
      <input
        type="text"
        ref={input}
        style={isDark ? { background: "#232b39", color: "#fff" } : null}
        placeholder="Search for places ..."
        onInput={(e) => {
          const value = e.target.value;
          clearTimeout(time);
          //Debounce
          time = setTimeout(() => {
            dispatchApp({ type: "CITY", payload: value });
          }, 500);
        }}
      />
    </div>
  );
}

export default CityInput;
