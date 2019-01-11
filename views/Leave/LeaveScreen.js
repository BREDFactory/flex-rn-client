// @flow
/* eslint-disable */
import React from "react";

import { AsyncStorage } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import config from "../../config/api";
import server from "../../config/server";
import styles from "./LeaveScreenStyles";
import type { Props, State } from "./LeaveScreenType";
import { goTo } from "../../utils/utils";

import I18n from "../../i18n/i18n";

/**
 * List of components
 */
import LeaveButton from "@components/Leave/LeaveButton";

type Historical = {
  place_id: string,
  begin: string,
  end: string
};

type Payload = {
  name: string,
  fname: string,
  id_user: string,
  id_place: string,
  historical: Array<Historical>,
  remoteDay: string
};

class LeaveScreen extends React.Component<Props, State> {
  static navigationOptions = () => ({
    title: I18n.t("leave.title")
  });

  _isMounted = false;

  constructor() {
    super();
    this.state = {
      place: ""
    };
  }

  componentDidMount() {
    this._isMounted = true;
    AsyncStorage.getItem("USER", (err, result) => {
      if (err || result == null) {
        goTo(this, "Login");
      } else {
        if (this._isMounted) this.setState(JSON.parse(result));
        const userId: string = JSON.parse(result).id;
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
              this.setState({ historical: data[0].historical });
            }
          });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  leavePlace(ctx) {
    const { name, fname, id, place, historical, remoteDay } = ctx.state;
    ctx = ctx || window;
    const payload: Payload = {
      name,
      fname,
      id_user: id,
      id_place: place,
      historical,
      remoteDay
    };
    fetch(server.address, {
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
        ctx.state.debug = "";
        ctx.state.place = "";
        ctx.state.isWrongFormatPlace = false;
        // ctx.state.remoteDay = false;
        AsyncStorage.setItem("USER", JSON.stringify(ctx.state));
        goTo(ctx, "Profile");
      });
  }

  render() {
    const { place } = this.state;
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#58C0D0", "#468BB6", "#3662A0"]}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <LeaveButton place={place} onPress={() => this.leavePlace(this)} />
      </LinearGradient>
    );
  }
}

export default LeaveScreen;
