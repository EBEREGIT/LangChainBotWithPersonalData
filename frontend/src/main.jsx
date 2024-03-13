import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppContextProvider from "./context/AppContext.jsx";
import VariableProvider from "./context/Variable.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VariableProvider>
      <AppContextProvider>
          <App />
      </AppContextProvider>
    </VariableProvider>
  </React.StrictMode>
);
