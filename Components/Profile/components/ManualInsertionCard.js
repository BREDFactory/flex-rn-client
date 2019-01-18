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
import { Button, FormInput } from "react-native-elements";
import { View } from "react-native";
import React from "react";
import I18n from "../../../i18n/i18n";
import styles from "./styles/ManualInsertionCardStyle";

const ManualInsertionCard = (props: {
  onChangeText: any => void,
  onPress: () => void
}) => {
  const { onChangeText, onPress } = props;
  return (
    <View style={styles.view}>
      <FormInput
        inputStyle={{ width: 100, fontFamily: "Raleway" }}
        style={styles.place}
        placeholder={I18n.t("profile.place")}
        onChangeText={onChangeText}
      />
      <Button
        fontWeight="bold"
        fontFamily="Raleway"
        buttonStyle={{
          elevation: 2,
          borderRadius: 15,
          backgroundColor: "#fff",
          shadowOpacity: 0.4,
          shadowRadius: 2,
          shadowColor: "#3662A0",
          shadowOffset: { height: 1, width: 0 }
        }}
        color="#2E89AD"
        style={styles.send}
        title={I18n.t("profile.send")}
        onPress={onPress}
      />
    </View>
  );
};

export default ManualInsertionCard;
