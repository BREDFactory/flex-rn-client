// @flow
/* eslint-disable */
import React from "react";

import { AsyncStorage, ScrollView, View, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { NavigationScreenProp, NavigationEvents } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import config from "../../config/api";
import server from "../../config/server";
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
    // Fetch environment variables
    this.fetchAppMode();
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
    const { PLACE_REGEX } = this.state;
    if (e.data.match(PLACE_REGEX) !== null) {
      this.setState({ place: e.data });
      getPlaces(this, sendToServ);
    } else {
      this.setState({ isWrongFormatPlace: true });
    }
  };

  fetchAppMode = async () => {
    const environment = await AsyncStorage.getItem("environment");
    this.setState({
      PLACE_REGEX: JSON.parse(environment).PLACE_REGEX
    });
  };

  DefaultComponent = () => {
    const {
      fname,
      name,
      id,
      place,
      PLACE_REGEX,
      isWrongFormatPlace,
      placeTaken
    } = this.state;
    return (
      <ScrollView style={styles.view}>
        <HeaderCard fname={fname} name={name} id={id} />
        <View>
          <QRCodeComponent onRead={this.onSuccess} />
          <View>
            <ManualInsertionCard
              onChangeText={text => this.setState({ place: text })}
              onPress={async () => {
                if (place !== "" && place.match(PLACE_REGEX) !== null) {
                  // getPlaces(this, sendToServ);
                  await getPlaces(this, sendToServ);
                  this.setState({
                    placeTaken: placeTaken || false
                  });
                } else this.setState({ isWrongFormatPlace: true });
              }}
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
