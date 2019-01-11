export const FETCH_PHOTO = "flex-office/photo/FETCH";
export const LOG_OUT = "flex-office/user/LOGOUT";

export default function reducer(state = { photo: "" }, action) {
  switch (action.type) {
    case FETCH_PHOTO:
      return { ...state, photo: action.payload.photo };
    case LOG_OUT:
      return { ...state, photo: action.payload.photo };
    default:
      return state;
  }
}

export function fetchPhoto(photo) {
  return {
    type: FETCH_PHOTO,
    payload: {
      photo
    }
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
    payload: {
      photo: ""
    }
  };
}
