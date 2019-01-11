import React from "react";
import {
  Image,
  TouchableHighlight,
  View,
  Text,
  AsyncStorage,
  Platform
} from "react-native";

import { createStore } from "redux";
import { Provider } from "react-redux";

import devToolsEnhancer from "remote-redux-devtools";

import { createStackNavigator, createTabNavigator } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import LoginScreen from "../views/Login/LoginScreen";
import ProfileScreen from "../views/Profile/ProfileScreen";
import SettingsScreen from "../views/Settings/SettingsScreen";
import PlacesScreen from "../views/Places/PlacesScreen";
import UsersScreen from "../views/Users/UsersScreen";
import OfflineNotice from "../utils/OfflineNotice";
import logo from "../assets/logo.png";
import ProfileImage from "./components/ProfileImage";
// import LocationNotice from "../utils/LocationNotice";

import reducer, { fetchPhoto } from "./components/reducer";

const store = createStore(reducer, devToolsEnhancer());

const fetchUserPhoto = async () => {
  const userPhoto = await AsyncStorage.getItem("USER");

  fetchPhoto(userPhoto);

  return JSON.parse(userPhoto).photo;
};

export const headerBar = (navigation, goBack = false, rightElement = true) => (
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
          }
    }
  >
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {/* Header Left */}
      {goBack ? (
        <TouchableHighlight
          activeOpacity={0.1}
          onPress={() => navigation.goBack()}
        >
          <Icon
            style={{ marginLeft: 20 }}
            name="angle-left"
            size={35}
            color="#2E89AD"
          />
        </TouchableHighlight>
      ) : (
        <Image
          source={logo}
          style={{
            width: 30,
            height: 30,
            margin: 10,
            resizeMode: "contain"
          }}
        />
      )}

      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 20,
          fontFamily: "Raleway"
        }}
      >
        Flex-Office
      </Text>

      {/* Header Right */}
      <TouchableHighlight
        activeOpacity={0.1}
        onPress={() => {
          if (rightElement) {
            navigation.navigate("SettingsScreen");
            fetchUserPhoto();
          }
        }}
      >
        <ProfileImage />
      </TouchableHighlight>
    </View>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#58C0D0", "#468BB6", "#3662A0"]}
      style={{ width: "100%", height: 7 }}
    />
  </View>
);

const NavigationApp = createStackNavigator({
  Login: { screen: LoginScreen },
  Profile: {
    screen: createTabNavigator(
      {
        ProfileScreen,
        PlacesScreen,
        UsersScreen
      },
      {
        title: "Places",
        tabBarPosition: "bottom",
        swipeEnabled: true,
        tabBarOptions: {
          labelStyle: {
            fontSize: 13,
            margin: 0,
            padding: 0,
            fontFamily: "Raleway"
          },
          showLabel: true,
          showIcon: true,
          inactiveTintColor: "#3662A0",
          activeTintColor: "#58C0D0",
          backgroundColor: "white", // "#58C0D0"
          // activeBackgroundColor: "white",
          style: {
            // backgroundColor: "#2E89AD",
            backgroundColor: "white",
            height: 50
          },
          indicatorStyle: {
            backgroundColor: "white"
          }
        }
      }
    ),
    navigationOptions: ({ navigation }) => ({
      /* Custom header */
      header: headerBar(navigation)
    })
  },
  // Leave: {
  //   screen: LeaveScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     /* Custom header */
  //     header: headerBar(navigation, false, false)
  //   })
  // },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      /* Custom header */
      header: headerBar(navigation, true)
    })
  }
});

const NetInfoWrapper = () => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <OfflineNotice />
      <NavigationApp />
      {/* <LocationNotice /> */}
    </View>
  </Provider>
);

export default NetInfoWrapper;
