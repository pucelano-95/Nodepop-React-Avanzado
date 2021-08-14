import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_SIGNUP_REQUEST,
  AUTH_SIGNUP_SUCCESS,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_DETAIL_REQUEST,
  ADVERTS_DETAIL_SUCCESS,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_DELETE_REQUEST,
  ADVERTS_DELETE_SUCCESS,
  ADVERTS_TAGS_REQUEST,
  ADVERTS_TAGS_SUCCESS,
  ADVERTS_NUMBER_REQUEST,
  ADVERTS_NUMBER_SUCCESS,
  CHANGE_PAGE_REQUEST,
  CHANGE_PAGE_SUCCESS,
  UI_RESET_ERROR,
} from "./types";

export const initialState = {
  auth: false,
  adverts: {
    loaded: false,
    data: [],
    numberTotalAds: 0,
  },
  tags: {
    loaded: false,
    data: [],
  },
  page: {
    loaded: false,
    data: 1,
  },
  ui: {
    loading: false,
    error: null,
    messageSuccess: null,
  },
};

export function auth(state = initialState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
}

export function adverts(state = initialState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return { ...state, loaded: true, data: action.payload };
    case ADVERTS_CREATED_SUCCESS:
    case ADVERTS_DETAIL_SUCCESS:
      return { ...state, loaded: false, data: [...state.data, action.payload] };
    case ADVERTS_DELETE_SUCCESS:
      return {
        ...state,
        loaded: false,
        data: [...state.data.filter((advert) => advert.id !== action.payload)],
      };
    case ADVERTS_NUMBER_SUCCESS:
      return { ...state, loaded: true, numberTotalAds: action.payload };
    default:
      return state;
  }
}

export function tags(state = initialState.tags, action) {
  switch (action.type) {
    case ADVERTS_TAGS_SUCCESS:
      return { ...state, loaded: true, data: action.payload };
    default:
      return state;
  }
}

export function page(state = initialState.page, action) {
  switch (action.type) {
    case CHANGE_PAGE_SUCCESS:
      return { ...state, loaded: true, data: action.payload };
    default:
      return state;
  }
}

export function ui(state = initialState.ui, action) {
  if (action.error) {
    return {
      ...state,
      loading: false,
      error: action.payload,
      messageSuccess: null,
    };
  }
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case AUTH_LOGOUT_REQUEST:
    case AUTH_SIGNUP_REQUEST:
    case ADVERTS_LOADED_REQUEST:
    case ADVERTS_CREATED_REQUEST:
    case ADVERTS_DETAIL_REQUEST:
    case ADVERTS_DELETE_REQUEST:
    case ADVERTS_TAGS_REQUEST:
    case ADVERTS_NUMBER_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case SEND_EMAIL_REQUEST:
    case CHANGE_PAGE_REQUEST:
      return { ...state, loading: true, error: null, messageSuccess: null };
    case AUTH_LOGOUT_SUCCESS:
    case ADVERTS_DETAIL_SUCCESS:
    case ADVERTS_LOADED_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "",
      };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "You have just registered correctly!",
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "You have just reset your password correctly!",
      };
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "Email sent it correctly! Check your email, please",
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "Login successfully!",
      };
    case ADVERTS_CREATED_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "Advert created successfully!",
      };
    case ADVERTS_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "Advert deleted successfully!",
      };
    case ADVERTS_TAGS_SUCCESS:
    case ADVERTS_NUMBER_SUCCESS:
    case CHANGE_PAGE_SUCCESS:
      return { ...state, loading: false };
    case UI_RESET_ERROR:
      return {
        ...state,
        error: null,
        messageSuccess: null,
      };
    default:
      return state;
  }
}
