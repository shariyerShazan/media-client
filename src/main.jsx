import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { Router } from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import {Provider} from  "react-redux"
import store from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from "redux-persist";

let persistor = persistStore(store)

 createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={Router} />
      <ToastContainer position="top-left" autoClose={5000} />
      </PersistGate>
      </Provider>
    </>
  </StrictMode>
);
