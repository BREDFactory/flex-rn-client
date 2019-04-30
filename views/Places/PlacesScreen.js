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
import styles from "../Profile/ProfileScreenStyles";
import { getPlaces, goTo } from "../../utils/utils";

import I18n from "../../i18n/i18n";

/**
 * List of components
 */
import FetchPlacesButton from "@components/Places/FetchPlacesButton";

const ZoneIndex = ["Zone verte", "Zone bleue", "Zone rouge"];

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
  debug: Array<any> | string
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
      debug: "",
      selectedFloorIndex: 0,
      loading: false,
      selectedZoneIndex: 0
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("USER", (err, result) => {
      if (err || !result) goTo(this, "Login");
      else {
        this.setState(JSON.parse(result));
        getPlaces(this, this.setPlaces);
      }
    });
  }

  setPlaces = async (ctx: State, json) => {
    const result = json.filter(
      element => element !== null && element.using === false
    );
    ctx.setState({ debug: result });
  };

  updateFloorIndex = selectedFloorIndex => {
    this.setState({ selectedFloorIndex });
  };

  updateZoneIndex = selectedZoneIndex => {
    this.setState({ selectedZoneIndex });
  };

  handleList = () => {
    const { debug, selectedFloorIndex, selectedZoneIndex } = this.state;

    const floor = selectedFloorIndex === 0 ? 3 : 4;

    const newT: string | Array<object> =
      debug !== ""
        ? debug.filter(e => {
            let finalResult = true;

            // Check the current selected floor
            if (e.id[0] != floor) finalResult = false;

            switch (ZoneIndex[selectedZoneIndex]) {
              case "Zone rouge":
                if (e.id[2] !== "R") finalResult = false;
                break;
              case "Zone verte":
                if (e.id[2] !== "V") finalResult = false;
                break;
              case "Zone bleue":
                if (e.id[2] !== "B") finalResult = false;
            }
            return finalResult;
          })
        : debug;
    return newT;
  };

  render() {
    const {
      debug,
      selectedFloorIndex,
      loading,
      selectedZoneIndex
    } = this.state;

    const FloorIndex = ["3ème étage", "4ème étage"];

    return (
      <ScrollView style={styles.view}>
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
          <ButtonGroup
            onPress={this.updateFloorIndex}
            selectedIndex={selectedFloorIndex}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2E89AD"
            }}
            containerStyle={{
              height: 30,
              borderRadius: 5
            }}
            selectedTextStyle={{ color: "#2E89AD", fontWeight: "bold" }}
            selectedButtonStyle={{ backgroundColor: "white" }}
            textStyle={{ color: "black", fontFamily: "Raleway" }}
            buttons={FloorIndex}
          />
          
          {/* Zone selector */}
          <ButtonGroup
            onPress={this.updateZoneIndex}
            containerStyle={{
              height: 30,
              borderRadius: 5
            }}
            selectedIndex={selectedZoneIndex}
            selectedButtonStyle={{ backgroundColor: "white" }}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2E89AD"
            }}
            selectedTextStyle={{ color: "#2E89AD", fontWeight: "bold" }}
            textStyle={{ color: "black", fontFamily: "Raleway" }}
            buttons={ZoneIndex}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <FetchPlacesButton
            onPress={() => getPlaces(this, this.setPlaces, null, true)}
          />
        </View>
        <View style={{ marginTop: 5, marginLeft: 35, marginRight: 35 }}>
          {debug !== "" && debug && !loading ? (
            <FlatList
              data={this.handleList()}
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
            <View
              style={{
                backgroundColor: "white",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator
                style={{ marginTop: 20 }}
                size="large"
                color="#2E89AD"
              />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default PlacesScreen;
