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
// @flow
import React from "react";
import { AsyncStorage, Alert } from "react-native";

import config from "../config/api";
import server from "../config/server";

export const checkNavigation = (ctx, str) => {
  const {
    navigation: { navigate }
  } = ctx.props;

  AsyncStorage.getItem("USER", (err, result) => {
    if (err || !result) navigate("Login");
    else if (str) navigate(str);
    else navigate("Profile");
  });
};

export const goTo = (ctx, str: string) => {
  checkNavigation(ctx, str);
};

/** This function is used to get the places from the server */

export const getPlaces = (ctx, fn, element = null, loader = false) => {
  ctx = ctx || window;
  if (loader) ctx.setState({ loading: true });
  fetch(`${server.address}places/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": config.token
    }
  })
    .then(res => res.json()) // transform data to json
    .then(data => {
      if (loader) ctx.setState({ loading: false });
      if (element) {
        fn(ctx, element);
      } else {
        fn(ctx, data);
      }
    });
};
