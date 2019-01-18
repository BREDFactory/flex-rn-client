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
import { View } from "react-native";
import { Button } from "react-native-elements";
import I18n from "react-native-i18n";
import React from "react";
import styles from "./styles/FindPlacesCardStyle";

const FindPlacesCard = (props: { users: any }) => {
  const { users } = props;
  return (
    <View style={styles.view}>
      <Button
        fontWeight="bold"
        fontFamily="Raleway"
        iconRight={{
          name: "sync",
          type: "font-awesome5",
          color: "#2E89AD"
        }}
        large={false}
        borderRadius={15}
        buttonStyle={{
          borderWidth: 0.5,
          borderColor: "#2E89AD"
        }}
        backgroundColor="#fff"
        color="#2E89AD"
        style={styles.free_places}
        title={I18n.t("users.users")}
        onPress={users}
      />
    </View>
  );
};

export default FindPlacesCard;
