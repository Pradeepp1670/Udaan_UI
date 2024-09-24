import { createContext, useEffect, useState } from "react";

export const FlightContext = createContext({
    flightCtx : {},
    setFlight: () => {}
});

export const FlightContextProvider = ({ children }) => {
    const [flightCtx, setFlight] = useState(() => {
      const storedState = localStorage.getItem('myContextState');
      return storedState ? JSON.parse(storedState) : { flightCtx : {}, setFlight: () => {} };
    });
  
    useEffect(() => {
      localStorage.setItem('myContextState', JSON.stringify(flightCtx));
    }, [flightCtx]);
  
    return (
      <FlightContext.Provider value={{ flightCtx, setFlight }}>
        {children}
      </FlightContext.Provider>
    );
  };