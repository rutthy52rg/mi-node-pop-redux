// import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./components/auth/context";
import { Provider } from "react-redux";

export default function Root({ store, router, accessToken }) {
  return (
    <Provider store={store}>
      <AuthProvider isInitiallyLogged={!!accessToken} >
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
}
