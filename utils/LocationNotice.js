import React, { PureComponent } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  PermissionsAndroid
} from "react-native";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import BackgroundTimer from "react-native-background-timer";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "green",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width,
    zIndex: 2
  },
  offlineText: { color: "#fff" }
});

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>Vous êtes à proximité du bâtiment</Text>
    </View>
  );
}

class OfflineNotice extends PureComponent {
  state = {
    positionGranted: false
  };

  componentWillUpdate(nextProps, nextState) {
    const { positionGranted } = this.state;
    if (nextState.positionGranted === true && positionGranted === false) {
      this.requestLocationPermission();
    }
  }

  componentWillUnmount() {
    BackgroundTimer.stopBackgroundTimer();
  }

  componentWillMount = async () => {
    await this.requestLocation();
    await this.requestLocationPermission();

    const { positionGranted } = this.state || false;

    if (
      positionGranted === PermissionsAndroid.RESULTS.GRANTED ||
      Platform.OS === "ios"
    ) {
      navigator.geolocation.watchPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => console.warn({ error: error.message }),
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0,
          distanceFilter: 0.1
        }
      );
    }
  };

  requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Position Permission",
        message: "We need to know if you are near the building."
      }
    );
    this.setState({ positionGranted: granted });
  };

  requestLocation = async () => {
    try {
      if (Platform.OS === "android")
        await LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message:
            "<h2>Use Location?</h2> This app wants to change your device settings:<br/><br/>Use location<br/><br/>",
          ok: "YES",
          cancel: "NO"
        }).then(() => {
          this.setState({ positionGranted: true });
        });
    } catch (err) {
      console.warn(err);
    }
  };

  // fetchWifiRegex = async () => {
  //   const regex = await AsyncStorage.getItem("environment");
  //   return regex.WIFI_REGEX;
  // };

  render() {
    const { latitude, longitude } = this.state;

    /**
     * process.ENV.left_longitude
     * process.ENV.right_longitude
     * process.ENV.left_latitude
     * process.ENV.right_latitude
     */
    if (latitude > 48 && longitude > 2) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

export default OfflineNotice;
