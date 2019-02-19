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
/* eslint-disable */
import React from "react";

import { AsyncStorage, ScrollView, View, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { NavigationScreenProp, NavigationEvents } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import config from "../../config/api";
import server from "../../config/server";
import regex from "../../config/regex";
import styles from "./ProfileScreenStyles";
import { getPlaces, goTo, sendToServ, leavePlace } from "../../utils/utils";
import I18n from "../../i18n/i18n";

import LottieView from "lottie-react-native";

/**
 * List of components
 */
import ManualInsertionCard from "@components/Profile/components/ManualInsertionCard";
import HeaderCard from "@components/Profile/components/HeaderCard";
import QRCodeComponent from "@components/Profile/components/QRCodeComponent";
import LeaveButton from "@components/Leave/LeaveButton";

type Historical = {
  place_id: string,
  begin: string,
  end: string
};

type State = {
  name: string,
  fname: string,
  id: string,
  place: string,
  historical: Array<Historical>,
  debug: Array<any> | string,
  isWrongFormatPlace: boolean,
  placeTaken: boolean
};

type Props = {
  navigation: NavigationScreenProp<{}>
};

class ProfileScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: I18n.t("profile.title"),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="qrcode" size={23} color={tintColor} />
      )
    };
  };

  _isMounted = false;

  constructor() {
    super();
    this.state = {
      name: "",
      fname: "",
      id: "",
      place: "",
      isWrongFormatPlace: false,
      placeTaken: false
      // progress: new Animated.Value(0),
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    this._isMounted = true;
    AsyncStorage.getItem("USER", (err, result) => {
      if (err || result === null) goTo(this, "Login");
      else {
        if (this._isMounted) {
          this.setState(JSON.parse(result));
          this.setState({
            placeTaken: JSON.parse(result).place !== ""
          });
          navigation.setParams(JSON.parse(result));
        }
        const userId = JSON.parse(result).id;
        fetch(`${server.address}users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": config.token
          }
        })
          .then(res => res.json()) // transform data to json
          .then(data => {
            if (this._isMounted) {
              this.setState({ historical: data[0].historical || [] });
            }
          });
      }
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSuccess = async e => {
    if (e.data.match(regex.place_regex) !== null) {
      this.setState({ place: e.data });
      getPlaces(this, sendToServ);
    } else {
      this.setState({ isWrongFormatPlace: true });
    }
  };

  DefaultComponent = () => {
    const {
      fname,
      name,
      id,
      place,
      isWrongFormatPlace,
      placeTaken
    } = this.state;

    insertPlace = async () => {
      if (place !== "" && place.match(regex.place_regex) !== null) {
        // getPlaces(this, sendToServ);
        await getPlaces(this, sendToServ);
        this.setState({
          placeTaken: placeTaken || false
        });
      } else this.setState({ isWrongFormatPlace: true });
    }

    return (
      <ScrollView style={styles.view}>
        <HeaderCard fname={fname} name={name} id={id} />
        <View>
          <QRCodeComponent onRead={this.onSuccess} />
          <View>
            <ManualInsertionCard
              onChangeText={text => this.setState({ place: text })}
              onSubmitEditing={() => insertPlace()}
              onPress={() => insertPlace()}
            />
            {isWrongFormatPlace ? (
              <Text style={styles.debug}>{I18n.t("profile.format")}</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    );
  };

  LeaveComponent = () => {
    const { place } = this.state;
    // Animated.timing(this.state.progress, {
    //   toValue: 1,
    //   duration: 7000
    // }).start();

    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* <LottieView
          source={require("./animation.json")}
          progress={this.state.progress}
        /> */}
        <LeaveButton place={place} onPress={() => this.leavePlace(this)} />
      </View>
    );
  };

  Content = ({ place }) => {
    if (!place) {
      return <this.DefaultComponent />;
    }
    return <this.LeaveComponent />;
  };

  async leavePlace(ctx) {
    const { id } = this.state;
    ctx = ctx || window;
    await fetch(`${server.address}users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": config.token
      }
    })
      .then(res => res.json()) // transform data to json
      .then(data => {
        ctx.setState({ historical: data[0].historical });
      });

    const { name, fname, place, historical, remoteDay } = this.state;

    const payload: Payload = {
      name,
      fname,
      id_user: id,
      id_place: place,
      historical,
      remoteDay
    };

    await fetch(server.address, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": config.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        ctx.setState({ debug: "ERROR" });
      })
      .then(data => {
        ctx.setState({
          placeTaken: false,
          isWrongFormatPlace: false,
          place: "",
          debug: ""
        });
        AsyncStorage.setItem("USER", JSON.stringify(this.state));
      });
  }

  render() {
    const { placeTaken } = this.state;

    return <this.Content place={placeTaken} />;
  }
}

export default ProfileScreen;
