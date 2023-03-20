// import React, { useReducer } from "react";
// import AppContext, {
//   appReducer,
//   initialAppState,
// } from "../provider/appContext";
import Forecast from "../components/Forecast";

function ForecastPage({ app, dispatchApp }) {
  //   const [app, dispatchApp] = useReducer(appReducer, initialAppState);

  return (
    <div className="container">
      <Forecast app={app} dispatchApp={dispatchApp} />
    </div>
  );
}

export default ForecastPage;
