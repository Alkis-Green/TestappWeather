import { createContext } from "react";

const initialAppState = {
  weather: null,
  unit: "C",
  city: "Athens",
  country: "GR",
  isDark: false,
  geoCoords: {
    lon: 23.727539,
    lat: 37.98381,
  },
};

// appReducer function updates the state based on the action that was dispatched
function appReducer(state, action) {
  const { type, payload } = action;

  // Loop over to determine which action was dispatched and return a new state obj
  switch (type) {
    case "WEATHER":
      return { ...state, weather: payload };
    case "CITY":
      return { ...state, city: payload };
    case "COUNTRY":
      return { ...state, country: payload };
    case "UNIT":
      return { ...state, unit: payload };
    case "GEO_COORDS":
      return { ...state, geoCoords: payload };
    case "DARK":
      return { ...state, isDark: payload };
    default:
      return state;
  }
}

const AppContext = createContext();

export { appReducer, initialAppState };
export default AppContext;
