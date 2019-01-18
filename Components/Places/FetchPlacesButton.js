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
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles/FetchPlacesButtonStyle";

const FetchPlacesButton = (props: { onPress: () => void }) => {
  const { onPress } = props;
  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text
          style={{
            color: "#2E89AD",
            fontFamily: "Raleway",
            fontWeight: "bold"
          }}
        >
          Je recherche une place
        </Text>
        <Icon name="arrow-right" size={15} color="#2E89AD" />
      </TouchableOpacity>
    </View>
  );
};

export default FetchPlacesButton;
