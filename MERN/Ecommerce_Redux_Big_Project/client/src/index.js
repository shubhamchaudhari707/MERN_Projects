import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
  offset: "30px",
};

ReactDOM.render(
  <>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </>,
  document.getElementById("root")
);
