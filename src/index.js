// import React from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter as Router } from "react-router-dom";

// import { configureClient } from "./api/client";
// import App from "./components/app";
// import { AuthProvider } from "./components/auth/context";
// import "./index.css";
// import configureStore from "./store";
// import storage from "./utils/storage";
// const store = configureStore();
// window.store = store;
// const accessToken = storage.get("auth");
// configureClient({ accessToken });

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Router store={store}>
//       <AuthProvider isInitiallyLogged={!!accessToken}>
//         <App />
//       </AuthProvider>
//     </Router>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { configureClient } from "./api/client";
import App from "./components/app";
import "./index.css";
import Root from "./Root";
import configureStore from "./store";
import storage from "./utils/storage";

const accessToken = storage.get("auth");
configureClient({ accessToken });
const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);
// console.log($, Popper);
const store = configureStore({ auth: !!accessToken }, { router });
console.log(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Root store={store} router={router} />
  // </React.StrictMode>
);
