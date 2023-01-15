import { areAdvertsLoaded, getAdvertDetail } from "./selectors";
import {
  ADVERTS_LOADED_FAILURE,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_LOADED_FAILURE,
  ADVERT_LOADED_REQUEST,
  ADVERT_LOADED_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from "./type";

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});
export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});
export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
  error: true,
});
//gracias al middleware y thunk
export const authLogin = (credentials) => {
  return async function (dispatch, getState, { api, router }) {
    try {
      dispatch(authLoginRequest());
      // await login(credentials);
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
      const to = router.state.location.state?.from?.pathname || "/";
      router.navigate(to, { replace: true });
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT,
});
export const authLogout = () => {
  return async function (dispatch, getState, { api, router }) {
    await api.auth.logout();
    dispatch(authLogoutSuccess());
    router.navigate(`/adverts`);
  };
};

export const advertsLoadedRequest = () => ({
  type: ADVERTS_LOADED_REQUEST,
});
export const advertsLoadedSuccess = (adverts) => ({
  type: ADVERTS_LOADED_SUCCESS,
  payload: adverts,
});
export const advertsLoadedFailure = (error) => ({
  type: ADVERTS_LOADED_FAILURE,
  payload: error,
  error: true,
});

// thuk

export const advertsLoad = () => {
  return async function (dispatch, getState, { api }) {
    const areLoaded = areAdvertsLoaded(getState());
    if (areLoaded) return;
    try {
      dispatch(advertsLoadedRequest());
      const adverts = await api.adverts.getAdverts();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
    }
  };
};

export const advertLoadedRequest = () => ({
  type: ADVERT_LOADED_REQUEST,
});
export const advertLoadedSuccess = (tweet) => ({
  type: ADVERT_LOADED_SUCCESS,
  payload: tweet,
});
export const advertLoadedFailure = (error) => ({
  type: ADVERT_LOADED_FAILURE,
  payload: error,
  error: true,
});

// thuk
export const advertLoad = (advertId) => {
  return async function (dispatch, getState, { api, router }) {
    const isLoaded = getAdvertDetail(advertId)(getState());
    if (isLoaded) return;
    try {
      dispatch(advertLoadedRequest());
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertLoadedSuccess(advert));
      console.log("hecho");
    } catch (error) {
      dispatch(advertLoadedFailure(error));
    }
  };
};
export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
