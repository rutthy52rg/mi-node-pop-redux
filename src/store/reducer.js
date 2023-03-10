import {
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_DELETED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  TAGS_LOADED_SUCCESS,
  UI_RESET_ERROR,
} from "./type";

export const stateDefault = {
  auth: false,
  adverts: {
    areLoaded: false,
    data: [],
  },
  tags: {
    areLoaded: false,
    data: [],
  },
  ui: {
    isLoadding: false,
    error: null,
  },
};

export function auth(state = stateDefault.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function adverts(state = stateDefault.adverts, action) {
  if (action.type === ADVERTS_LOADED_SUCCESS) {
    return { areLoaded: true, data: action.payload };
  }
  if (action.type === ADVERT_LOADED_SUCCESS) {
    return { ...state, data: [action.payload] };
  }
  if (action.type === ADVERT_CREATED_SUCCESS) {
    return { ...state, data: [action.payload, ...state.data] }; // añadimos el último a la data que ya hay => ponemos el primero el nuevo para que se guarde antes que los existentes ya
  }
  if (action.type === ADVERT_DELETED_SUCCESS) {
    return {
      ...state,
      data: [...state.data.filter((item) => item.id !== action.payload)],
    };
  }
  return state;
}
export function tags(state = stateDefault.tags, action) {
  if (action.type === TAGS_LOADED_SUCCESS) {
    return { areLoaded: true, data: action.payload };
  }

  return state;
}

export function ui(state = stateDefault.ui, action) {
  if (/_FAILURE$/.test(action.type)) {
    return {
      isLoadding: false,
      error: action.payload,
    };
  }
  if (/_REQUEST$/.test(action.type)) {
    return {
      isLoadding: true,
      error: null,
    };
  }
  if (/_SUCCESS$/.test(action.type)) {
    return {
      isLoadding: false,
      error: null,
    };
  }
  if (action.type === UI_RESET_ERROR) {
    return {
      ...state,
      error: null,
    };
  }
  return state;
}
