import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store,persistor } from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> 
                 <App />
          </PersistGate>
        </Provider>
      </AuthContextProvider>
  </React.StrictMode>
);
