import { useReducer } from "react";
import AppContext, { appReducer, initialAppState } from "./provider/appContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForecastPage from "./pages/ForecastPage";
import "./App.css";

function App() {
  const [app, dispatchApp] = useReducer(appReducer, initialAppState);

  return (
    <AppContext.Provider value={{ app, dispatchApp }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home app={app} dispatchApp={dispatchApp} />}
          />
          <Route
            path="/forecast"
            element={<ForecastPage app={app} dispatchApp={dispatchApp} />}
          />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
