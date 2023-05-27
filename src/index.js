import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Import Swiper styles
import "swiper/css";

import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/configStore";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
