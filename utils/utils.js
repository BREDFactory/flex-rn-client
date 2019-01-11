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
    if (err || result == null) {
      navigate("Login");
    } else {
      const jsonres = JSON.parse(result);
      if (str) navigate(str);
      else if (
        !jsonres.place ||
        jsonres.place === null ||
        jsonres.place === ""
      ) {
        navigate("Profile");
      } else {
        navigate("Profile");
      }
    }
  });
};

export const goTo = (ctx, str: string) => {
  checkNavigation(ctx, str);
};

/** This function is used to send a new place to the server */

export const sendToServ = (ctx, json) => {
  if (
    (ctx.state.name !== "" &&
      ctx.state.fname !== "" &&
      ctx.state.id !== "" &&
      ctx.state.place !== "" &&
      ctx.state.historical !== []) ||
    typeof ctx.state.remoteDay !== "undefined"
  ) {
    const { name, fname, id, place, historical, remoteDay, photo } = ctx.state;
    ctx = ctx || window;

    const payload = {
      name,
      fname,
      id_user: id,
      id_place: place,
      historical,
      remoteDay,
      photo
    };

    fetch(server.address, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": config.token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (ctx.state.place !== "") {
          let redirect = true;
          if (data.body) {
            Alert.alert(
              `Place déjà utilisée`,
              `Place utilisée par : ${data.body}`
            );
            return;
          }

          json.map(element =>
            payload.id_place == element.id && element.using
              ? (redirect = false)
              : null
          );
          if (redirect) {
            ctx.setState({ placeTaken: true });
          }
        }
        AsyncStorage.setItem("USER", JSON.stringify(ctx.state));
      });
  }
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
