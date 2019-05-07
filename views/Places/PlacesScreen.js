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
import Icon from "react-native-vector-icons/FontAwesome";

import {
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  View,
  Text,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import config from "../../config/api";
import server from "../../config/server";
import placesConfig from "../../config/places";
import { goTo } from "../../utils/utils";

import I18n from "../../i18n/i18n";
import styles from "./PlacesScreenStyle";

/**
 * List of components
 */
import FetchPlacesButton from "@components/Places/FetchPlacesButton";
import PlacesSelector from "@components/Places/PlacesSelector";
import PlacesList from "../../Components/Places/PlacesList";

type State = {
  places: Array<Object>,
  loading: boolean,
  selectedFloorIndex: number,
  selectedZoneIndex: number,
  selectedSideIndex: number
};

type Props = {
  navigation: NavigationScreenProp<{}>
};

class PlacesScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: I18n.t("places.title"),
    tabBarIcon: ({ tintColor }) => (
      <Icon name="search" size={20} color={tintColor} />
    )
  };

  constructor() {
    super();
    this.state = {
      places: [],
      loading: true,
      selectedFloorIndex: 0,
      selectedZoneIndex: 0,
      selectedSideIndex: 0
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("USER", (err, result) => {
      if (err || !result) goTo(this, "Login");
      else {
        this.setState(JSON.parse(result));
        this.getPlaces();
      }
    });
  }

  getPlaces = () => {
    this.setState({ loading: true });
    fetch(`${server.address}places/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": config.token
      }
    })
      .then(res => res.json())
      .then(data => {
        const result = data.filter(place => place.using === false);
        this.setState({
          places: result,
          loading: false
        });
      });
  }

  updateFloorIndex = selectedFloorIndex => {
    this.setState({ selectedFloorIndex });
  };

  updateZoneIndex = selectedZoneIndex => {
    this.setState({ selectedZoneIndex });
  };

  updateSideIndex = selectedSideIndex => {
    this.setState({ selectedSideIndex });
  };

  filterPlaces = () => {
    const { places, selectedFloorIndex, selectedZoneIndex, selectedSideIndex } = this.state;

    const floor = selectedFloorIndex === 0 ? "3" : "4";
    const zoneCode = placesConfig.zoneCodes[selectedZoneIndex];
    const side = placesConfig.sideIndexUpper[selectedSideIndex];

    return places.filter(place => place.id[0] === floor && place.id[2] === zoneCode && place.id.slice(4, -2) === side);
  };

  render() {
    const {
      loading,
      selectedFloorIndex,
      selectedZoneIndex,
      selectedSideIndex
    } = this.state;

    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={ styles.selectorContainer }>

          <Text style={ styles.label }>{I18n.t("places.free_places")}</Text>

          {/* Floor selector */}
          <PlacesSelector
            buttons={ placesConfig.floorIndex }
            onPress={ this.updateFloorIndex }
            selectedIndex={ selectedFloorIndex }
          />

          {/* Zone selector */}
          <PlacesSelector
            buttons={ placesConfig.zoneIndex }
            onPress={ this.updateZoneIndex }
            selectedIndex={ selectedZoneIndex }
          />

          {/* Side selector */}
          <PlacesSelector
            buttons={ placesConfig.sideIndex }
            onPress={ this.updateSideIndex }
            selectedIndex={ selectedSideIndex }
          />

          <FetchPlacesButton
            onPress={() => this.getPlaces()}
          />
        </View>
        <View style={{ marginLeft: 35, marginRight: 35 }}>
          {!loading ? (
            <PlacesList places={this.filterPlaces()} />
          ) : (
            <ActivityIndicator
              style={{ marginTop: 20 }}
              size="large"
              color="#2E89AD"
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

export default PlacesScreen;
