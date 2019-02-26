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
import { AsyncStorage, View, Image } from "react-native";

import { Text } from "react-native-elements";
import { omit } from "ramda";
import LinearGradient from "react-native-linear-gradient";
import styles from "./LoginScreenStyles";
import server from "../../config/server";
import config from "../../config/api";
import type { Props, State } from "./LoginScreenType";

import logo from "../../assets/logo.png";

import I18n from "../../i18n/i18n";
import { checkNavigation } from "../../utils/utils";

/**
 * List of components
 */
// eslint-disable-next-line
import LoginButton from "@components/Login/LoginButton";
// eslint-disable-next-line
import InputLogin from "@components/Login/InputLogin";

const fetchData = function fetchEnvironment() {
  fetch(`${server.address}environment`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": config.token
    }
  })
    .then(res => res.json())
    .then(data => {
      const { LOGIN_REGEX, PLACE_REGEX } = data;
      const environmentVariable = {
        LOGIN_REGEX,
        PLACE_REGEX
      };
      this.setState({ LOGIN_REGEX });
      AsyncStorage.setItem("environment", JSON.stringify(environmentVariable));
    });
  checkNavigation(this);
};

class LoginScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: (
      <View
        style={{
          paddingTop: 20 /* only for IOS to give StatusBar Space */,
          backgroundColor: "white",
          height: 80
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              fontFamily: "Raleway"
            }}
          >
            Flex-Office
          </Text>
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#58C0D0", "#468BB6", "#3662A0"]}
          style={{ width: "100%", height: 7 }}
        />
      </View>
    )
  };

  constructor() {
    super();
    this.state = {
      name: "",
      fname: "",
      id: "",
      place: "",
      debug: "",
      debugField: "",
      remoteDay: "",
      historical: [],
      photo: ""
    };
  }

  componentWillMount() {
    fetchData.call(this);
  }

  /** This function handle the user login */
  logIn() {
    const { navigation } = this.props;
    const { name, fname, id, LOGIN_REGEX, historical } = this.state;

    if (
      name !== "" &&
      fname !== "" &&
      id !== "" &&
      id.match(LOGIN_REGEX) !== null
    ) {
      const payload = {
        name,
        fname,
        id_user: id,
        id_place: "",
        historical
      };

      fetch(`${server.address}login_user`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": config.token
        }
      })
        .then(res => {
          if (res.status === 200) return res.json();
          return false;
        })
        .then(data => {
          if (data !== false) {
            if (data.user)
              this.setState({
                remoteDay: data.user.remoteDay,
                photo: data.user.photo,
                friend: data.user.friend,
                place: data.user.id_place
              });
            else this.setState({ friend: [] });
            AsyncStorage.setItem(
              "USER",
              JSON.stringify(omit(["debugField"], this.state))
            );
            navigation.navigate(
              "Profile",
              data.user ? { photo: data.user.photo } : {}
            );
          } else {
            this.setState({ debugField: I18n.t("login.debug") });
          }
        });
    } else {
      this.setState({ debugField: I18n.t("login.debug") });
    }
  }

  render() {
    const { debugField } = this.state;
    return (
      <View style={styles.view}>
        <Image source={logo} style={{ height: 120, resizeMode: "contain" }} />
        <View style={styles.view_second}>
          <InputLogin
            onSubmitEditing={() => this.logIn()}
            onChangeText={text => this.setState({ name: text })}
            onChangeText1={text => this.setState({ fname: text })}
            onChangeText2={text => this.setState({ id: text })}
          />
          <LoginButton onPress={() => this.logIn()} />
          <Text style={styles.debug}>{debugField}</Text>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
