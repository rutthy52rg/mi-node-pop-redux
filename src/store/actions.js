import { areAdvertsLoaded, areTagsLoaded, getAdvertDetail } from "./selectors";
import {
  ADVERTS_LOADED_FAILURE,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_FAILURE,
  ADVERT_CREATED_REQUEST,
  ADVERT_CREATED_SUCCESS,
  ADVERT_DELETED_FAILURE,
  ADVERT_DELETED_REQUEST,
  ADVERT_DELETED_SUCCESS,
  ADVERT_LOADED_FAILURE,
  ADVERT_LOADED_REQUEST,
  ADVERT_LOADED_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  TAGS_LOADED_FAILURE,
  TAGS_LOADED_REQUEST,
  TAGS_LOADED_SUCCESS,
  UI_RESET_ERROR,
} from "./type";
/* =============  LOGIN ==============  */
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
/* =============  LOGIN ==============  */
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
/* =============  LOGOUT ==============  */
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

/* =============  ADVERTS ==============  */
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

/* =============  LOADED TAGS  ==============  */
export const tagsLoadedRequest = () => ({
  type: TAGS_LOADED_REQUEST,
});
export const tagsLoadedSuccess = (tags) => ({
  type: TAGS_LOADED_SUCCESS,
  payload: tags,
});
export const tagsLoadedFailure = (error) => ({
  type: TAGS_LOADED_FAILURE,
  payload: error,
  error: true,
});

// thuk
export const tagsLoad = () => {
  return async function (dispatch, getState, { api }) {
    const areLoaded = areTagsLoaded(getState());
    if (areLoaded) return;
    try {
      dispatch(tagsLoadedRequest());
      const tags = await api.adverts.getTags();
      dispatch(tagsLoadedSuccess(tags));
    } catch (error) {
      dispatch(tagsLoadedFailure(error));
    }
  };
};

/* =============  ADVERT DETAIL  ==============  */
export const advertLoadedRequest = () => ({
  type: ADVERT_LOADED_REQUEST,
});
export const advertLoadedSuccess = (advert) => ({
  type: ADVERT_LOADED_SUCCESS,
  payload: advert,
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
/* ============= CREATED ADVERT ==============  */
export const advertCreatedRequest = () => ({
  type: ADVERT_CREATED_REQUEST,
});
export const advertCreatedSuccess = (advert) => ({
  type: ADVERT_CREATED_SUCCESS,
  payload: advert,
});
export const advertCreatedFailure = (error) => ({
  type: ADVERT_CREATED_FAILURE,
  payload: error,
  error: true,
});
// thuk
export const advertCreated = (advert) => {
  return async function (dispatch, getState, { api, router }) {
    try {
      dispatch(advertCreatedRequest());
      const { id } = await api.adverts.createAdvert(advert);
      const createAdvert = await api.adverts.getAdvert(id);
      dispatch(advertCreatedSuccess(createAdvert));
      router.navigate(`/adverts/${id}`);
      return createAdvert;
    } catch (error) {
      dispatch(advertCreatedFailure(error));
    }
  };
};
/* =============  DELETED ADVERT ==============  */
export const advertDeletedRequest = () => ({
  type: ADVERT_DELETED_REQUEST,
});
export const advertDeletedSuccess = (advertId) => ({
  type: ADVERT_DELETED_SUCCESS,
  payload: advertId,
});
export const advertDeletedFailure = (error) => ({
  type: ADVERT_DELETED_FAILURE,
  payload: error,
  error: true,
});

// thunk
export const advertDeleted = (advertId) => {
  return async function (dispatch, getState, { api, router }) {
    try {
      dispatch(advertDeletedRequest());
      await api.adverts.deleteAdvert(advertId);
      dispatch(advertDeletedSuccess(advertId));
      console.log("hecho");
      router.navigate(`/adverts`);
    } catch (error) {
      dispatch(advertDeletedFailure(error));
    }
  };
};

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
