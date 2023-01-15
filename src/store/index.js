import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as adverts from "../components/adverts/service";
import * as auth from "../components/auth/service";
import * as reducers from "./../store/reducer";

const reducer = combineReducers(reducers);

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action, store.getState());
  const result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};
const failureRedirections =
  (router, redirections) => (store) => (next) => (action) => {
    const result = next(action);
    if (action.error) {
      const redirection = redirections[action.payload.status];
      if (redirection) {
        router.navigate(redirection);
      }
    }
    return result;
  };
export default function configureStore(preloadedState, { router }) {
  const middlewares = [
    thunk.withExtraArgument({ api: { auth, adverts }, router }),
    failureRedirections(router, {
      401: "/login",
      404: "/404",
    }),
    logger
  ];
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  return store;
}
