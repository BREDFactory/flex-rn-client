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
import React, { Component } from "react";
import {
  AsyncStorage,
  Text,
  View,
  Image,
  ScrollView,
  Animated,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from "react-native";

import { ButtonGroup, Button } from "react-native-elements";
import { connect } from "react-redux";
import { assoc, omit } from "ramda";
import PhotoUpload from "react-native-photo-upload";
import Modal from "react-native-modal";
import config from "../../config/api";
import server from "../../config/server";
import { goTo } from "../../utils/utils";
import picProfile from "../../assets/profile.png";
import LottieView from "lottie-react-native";
import { NavigationActions, StackActions } from "react-navigation";

import moment from "moment"

import styles from "./SettingsScreenStyles";

// import { Calendar } from "react-native-calendars";
import DeconnectionButton from "@components/Settings/DeconnectionButton";

import { fetchPhoto, logOut } from "../../Navigation/components/reducer";

const WEEK_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

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
  remoteDay: string,
  arrayOfFriends: Array<any>
};

type Props = {
  navigation: NavigationScreenProp<{}>
};

export const ProfileDescription = (props: { name: any, fname: any, id: any }) => {
  const { name, fname, id } = props;
  return (
    <View style={{ marginLeft: 20 }}>
      <Text style={{ fontFamily: "Raleway" }}>
        <Text style={{ fontWeight: "bold" }}>Nom : </Text>
        {name}
      </Text>
      <Text style={{ fontFamily: "Raleway" }}>
        <Text style={{ fontWeight: "bold" }}>Prenom : </Text>
        {fname}
      </Text>
      <Text style={{ fontFamily: "Raleway" }}>
        <Text style={{ fontWeight: "bold" }}>ID : </Text>
        {id}
      </Text>
    </View>
  );
};

export const ModalComponent = (props: { visible: any, ctx: any }) => {
  const { visible, ctx } = props;
  // Animated.timing(ctx.state.progress, {
  //   toValue: 1,
  //   duration: 3500
  // }).start();
  return (
    <Modal
      isVisible={visible}
      backdropColor="white"
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      {/* <ActivityIndicator size="large" color="#2E89AD" /> */}
      <View
        style={{
          backgroundColor: "transparent",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* Used with lottie-react-native purpose */}
        {/* <LottieView
          style={{ height: 80, width: 80, marginTop: 10 }}
          source={require("../../assets/loading.json")}
          progress={ctx.state.progress}
        /> */}
        <ActivityIndicator size="large" color="#2E89AD" />
      </View>
    </Modal>
  );
};

export class SettingsScreen extends Component<Props, State> {
  static navigationOptions = {
    title: "Profile",
    headerTintColor: "black",
    tabBarIcon: () => (
      <Image
        source={picProfile}
        resizeMode="contain"
        style={{ width: 20, height: 20 }}
      />
    )
  };

  constructor() {
    super();
    this.state = {
      name: "",
      fname: "",
      id: "",
      selectedIndex: 0,
      photo: "",
      arrayOfFriends: [],
      loadingSave: false,
      progress: new Animated.Value(0),
      userPlace: null,
      startDate: "",
      endDate: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    AsyncStorage.getItem("USER", (err, result) => {
      if (err || result === null) goTo(this, "Login");
      else {
        this.setState(JSON.parse(result));
        navigation.setParams(JSON.parse(result));
        this.setState({
          // map Trouve index du jour
          selectedIndex: WEEK_DAYS.findIndex(
            e => e === JSON.parse(result).remoteDay
          ),
          place: ""
        });
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
            this.setState({
              historical: data.historical,
              loadingSave: false
            });
            this.getUserPlace(userId)
          });
      }
    });
  }

  getUserPlace = userId => {
    fetch(`${server.address}users/${userId}/place`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": config.token
      }
    })
      .then(res => res.json()) // transform data to json
      .then(data => {
        console.log("data")
        console.log(data)
        this.setState({
          userPlace: data,
          startDate: moment(data.start_date).format("DD/MM/YYYY"),
          endDate: moment(data.end_date).format("DD/MM/YYYY")
        });
      });
  }

  updateIndex = selectedIndex => {
    this.setState({ selectedIndex, remoteDay: WEEK_DAYS[selectedIndex] });
  };

  saveRemote = async () => {
    const { id, photo, remoteDay, startDate, endDate } = this.state;
    // this.setState({ loadingSave: true });

    const payload = {
      id_user: id,
      photo,
      remoteDay,
      startDate,
      endDate
    };

    fetch(`${server.address}settings_user`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": config.token
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });

    // Wait until the photo is uploaded to Cloudinary and the link is provided to perform request
    setTimeout(async () => {
      fetch(`${server.address}users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": config.token
        }
      })
        .then(res => res.json())
        .then(data => {
          this.props.fetchPhoto(data.photo);
          AsyncStorage.setItem(
            "USER",
            JSON.stringify(
              assoc(
                "place",
                data.id_place,
                omit(["loadingSave"], assoc("photo", data.photo, this.state))
              )
            )
          );

          this.setState({ loadingSave: false });
        });
    }, 3000);
  };

  render() {
    const { selectedIndex, name, fname, id, photo, loadingSave, userPlace, startDate, endDate } = this.state;

    return (
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.viewContainer}>
          <ModalComponent visible={loadingSave} ctx={this} />
          <ProfileDescription name={name} fname={fname} id={id} />
          <PhotoUpload
            onPhotoSelect={image => {
              if (image) {
                this.setState({ photo: image });
                this.saveRemote();
              }
            }}
          >
            <Image
              style={
                photo
                  ? {
                      width: 70,
                      height: 70,
                      borderRadius: 35
                    }
                  : {
                      width: 70,
                      height: 70,
                    }
              }
              resizeMode={ photo ? "cover" : "contain" }
              source={ photo ? { uri: photo } : require("../../assets/profile.png") }
            />
          </PhotoUpload>
        </View>
        <View style={styles.viewContainerRemote}>
          <Text style={styles.remoteText}>Jour de télétravail </Text>
          <ButtonGroup
            containerStyle={{ backgroundColor: "#F5F5F5", marginBottom: 10 }}
            buttonStyle={{
              backgroundColor: "white"
            }}
            selectedTextStyle={{
              color: "#2E89AD",
              fontWeight: "bold"
            }}
            selectedButtonStyle={{
              backgroundColor: "white"
            }}
            textStyle={{ fontFamily: "Raleway", fontSize: 13 }}
            onPress={async event => {
              await this.updateIndex(event);
              this.saveRemote();
            }}
            selectedIndex={selectedIndex}
            buttons={WEEK_DAYS}
          />
        </View>

        { userPlace ? (
          <View style={styles.viewContainerSemiFlex}>
            <Text style={styles.remoteText}>Je suis absent.e entre</Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TextInput
                style={styles.input}
                underlineColorAndroid={'#DBE2EA'}
                onChangeText={text => this.setState({ startDate: text })}
                value={startDate}
              />
              <Text style={styles.remoteText}>et</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid={'#DBE2EA'}
                onChangeText={text => this.setState({ endDate: text })}
                value={endDate}
              />
            </View>
            <TouchableOpacity
              style={{ alignSelf: 'stretch', backgroundColor: '#841584' }}
              onPress={() => this.saveRemote()}
              color="#841584"
            >
              <Text style={{ textAlign: 'center' }}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        ) : null }

        {/* For future purpose */}
        {/* <Calendar /> */}

        <DeconnectionButton
          onPress={() => {
            // LogOut current user
            const { navigation } = this.props;
            this.props.logOut("");
            AsyncStorage.removeItem("USER");
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "Login" })]
            });
            navigation.dispatch(resetAction);
          }}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    photo: state.photo
  };
};

const mapDispatchToProps = {
  fetchPhoto,
  logOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
