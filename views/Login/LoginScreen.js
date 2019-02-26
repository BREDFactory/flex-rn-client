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
import { AsyncStorage, View, Animated, Keyboard } from "react-native";

import { Text } from "react-native-elements";
import { omit } from "ramda";
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
    // Animation values for iOs (only) keyboard handling
    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(120);
  }

  componentWillMount() {
    checkNavigation(this);
    
    // Keyboard listeners for iOs only
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  // Keyboard event handlers for iOs only
  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: 40
      }),
    ]).start();
  };

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: 120,
      }),
    ]).start();
  };

  /** This function handle the user login */
  logIn() {
    const { navigation } = this.props;
    const { name, fname, id, historical } = this.state;

    if (
      name !== "" &&
      fname !== "" &&
      id !== "" &&
      id.match(regex.login_regex) !== null
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
      // Animation will work only on iOs
      <Animated.View style={ [styles.view, { paddingBottom: this.keyboardHeight }] }>
        <Animated.Image source={logo} style={{ height: this.imageHeight, resizeMode: "contain" }} />
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
      </Animated.View>
    );
  }
}

export default LoginScreen;
