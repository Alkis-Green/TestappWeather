import React, { useContext } from "react";
import AppContext from "../provider/appContext";

function Card({ children, className }) {
  // access the isDark value from the context
  // And use it to conditionally style the component.
  const {
    app: { isDark },
  } = useContext(AppContext);
  //
  //
  const card = {
    background: "rgb(25 32 45)",
    color: "#fff",
  };
  //
  //
  return (
    <div className={className} style={isDark ? card : null}>
      {children}
    </div>
  );
}

export default Card;