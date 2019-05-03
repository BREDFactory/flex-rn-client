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
import { AsyncStorage, View, Image, KeyboardAvoidingView, Platform } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { Text } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import styles from "./LoginScreenStyles";
import server from "../../config/server";
import config from "../../config/api";
import regex from "../../config/regex";
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

class LoginScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: (
      <View
        style={
          Platform.OS === "ios"
            ? {
            paddingTop: 20 /* only for IOS to give StatusBar Space */,
            backgroundColor: "white",
            height: 80
          }
        : {
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
    this.name = "";
    this.fname = "";
    this.id = "";
    this.state = {
      debugField: ""
    }
  }

  componentWillMount() {
    checkNavigation(this);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  /** This function handle the user login */
  logIn() {
    const { navigation } = this.props;

    if (
      this.name !== "" &&
      this.fname !== "" &&
      this.id !== "" &&
      this.id.match(regex.idRegex) !== null
    ) {
      const payload = {
        name: this.name,
        fname: this.fname,
        id_user: this.id
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
          if (res.status === 200) {
            res.json().then(user => {
              console.log(user);
              AsyncStorage.setItem("USER", JSON.stringify({
                id: this.id,
                name: this.name,
                fname: this.fname,
                place: user.id_place,
                historical: user.historical,
                photo: user.photo,
                remoteDay: user.remoteDay,
                pool: user.pool
              }));
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Profile" })]
              });
              navigation.dispatch(resetAction);
            });
          }
          else if (res.status === 400) {
            this.setState({ debugField: I18n.t("login.debug") });
            res.text().then(message => console.log(message));
          }
        })
    }
    else {
      this.setState({ debugField: I18n.t("login.debug") });
    }
  }

  render() {
    const { debugField } = this.state;
    return (
      <View style={styles.view}>
        <Image source={logo} style={{ height: "20%", resizeMode: "contain" }} />
        <KeyboardAvoidingView style={styles.view_second} behavior="padding">
          <InputLogin
            onSubmitEditing={() => this.logIn()}
            onChangeText={text => this.name = this.capitalizeFirstLetter(text)}
            onChangeText1={text => this.fname = this.capitalizeFirstLetter(text)}
            onChangeText2={text => this.id = text.toUpperCase()}
          />
          <LoginButton onPress={() => this.logIn()} />
          <Text style={styles.debug}>{debugField}</Text>
        </KeyboardAvoidingView>
        <Text style={styles.version}>1.0.3</Text>
      </View>
    );
  }
}

export default LoginScreen;
