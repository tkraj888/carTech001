import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/app/store.js";
import WebSocketConnection, { WebSocketProvider } from "./Utiles/WebSocketConnection.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <WebSocketProvider>
        <WebSocketConnection />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WebSocketProvider>
    </Provider>
  </React.StrictMode>
);
