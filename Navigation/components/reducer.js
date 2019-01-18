/*
Copyright 2019-2020 BRED Banque Populaire

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
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
