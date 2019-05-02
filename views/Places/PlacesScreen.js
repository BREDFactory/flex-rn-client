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
import { ButtonGroup, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import config from "../../config/api";
import server from "../../config/server";
import { goTo } from "../../utils/utils";

import I18n from "../../i18n/i18n";

/**
 * List of components
 */
import FetchPlacesButton from "@components/Places/FetchPlacesButton";
import PlacesSelector from "@components/Places/PlacesSelector";

type State = {
  name: string,
  fname: string,
  id: string,
  place: string,
  places: Array<Object>
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
      id: "",
      places: [],
      loading: false,
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
    const ZoneCodes = ["V", "B", "R"];
    const sideIndex = ["RER", "BOIS", "MILIEU"];

    const floor = selectedFloorIndex === 0 ? "3" : "4";
    const zoneCode = ZoneCodes[selectedZoneIndex];
    const side = sideIndex[selectedSideIndex];

    return places.filter(place => place.id[0] === floor && place.id[2] === zoneCode && place.id.slice(4, -2) === side);
  };

  render() {
    const {
      places,
      selectedFloorIndex,
      loading,
      selectedZoneIndex,
      selectedSideIndex
    } = this.state;

    const floorIndex = ["3ème étage", "4ème étage"];
    const zoneIndex = ["Zone verte", "Zone bleue", "Zone rouge"];
    const sideIndex = ["RER", "Bois", "Milieu"];

    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View
          style={{
            elevation: 2,
            padding: 25,
            borderRadius: 10,
            backgroundColor: "white",
            margin: 20,
            shadowOpacity: 0.4,
            shadowRadius: 2,
            shadowColor: "#3662A0",
            shadowOffset: { height: 1, width: 0 }
          }}
        >
          {/* Floor selector */}
          <PlacesSelector
            buttons={ floorIndex }
            onPress={ this.updateFloorIndex }
            selectedIndex={ selectedFloorIndex }
          />
          
          {/* Zone selector */}
          <PlacesSelector
            buttons={ zoneIndex }
            onPress={ this.updateZoneIndex }
            selectedIndex={ selectedZoneIndex }
          />

          {/* Side selector */}
          <PlacesSelector
            buttons={ sideIndex }
            onPress={ this.updateSideIndex }
            selectedIndex={ selectedSideIndex }
          />
        <View style={{ marginTop: 5, marginLeft: 35, marginRight: 35 }}>
          {places && !loading ? (
            <FlatList
              data={this.filterPlaces()}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              style={{
                marginBottom: 20
              }}
              numColumns={2}
              renderItem={place =>
                place.item ? (
                  <TouchableOpacity
                    activeOpacity={0.1}
                    key={place.item.id}
                  >
                    <Card
                      key={place.item.id}
                      title={place.item.id}
                      fontFamily="Raleway"
                      containerStyle={{
                        borderRadius: 10,
                        height: 80
                      }}
                      dividerStyle={{ display: "none" }}
                    >
                      <Icon
                        styl={{ textAlign: "center" }}
                        name="circle"
                        size={15}
                        color={
                          place.item.id[2] === "V"
                            ? "green"
                            : place.item.id[2] === "B"
                            ? "blue"
                            : "red"
                        }
                      />
                    </Card>
                  </TouchableOpacity>
                ) : (
                  "There is no free place for the moment !"
                )
              }
            />
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
