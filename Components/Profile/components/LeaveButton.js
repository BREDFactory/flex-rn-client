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
import { Button } from "react-native-elements";
import { View } from "react-native";
import styles from "../../../views/Profile/ProfileScreenStyles";
import I18n from "../../i18n/i18n";

const LeaveButton = (props: { place: any, onPress: () => void }) => {
  const { onPress, place } = props;
  return (
    <View style={styles.leave_button}>
      <Button
        style={styles.button}
        fontWeight="bold"
        fontFamily="Raleway"
        containerStyle={{ elevation: 1 }}
        buttonStyle={{
          width: 180,
          height: 180,
          borderWidth: 1,
          borderColor: "#3662A0",
          backgroundColor: "#fff",
          shadowOpacity: 0.4,
          shadowRadius: 2,
          shadowColor: "#3662A0",
          shadowOffset: { height: 1, width: 0 }
        }}
        borderRadius={100}
        color="#468BB6"
        backgroundColor="#fff"
        textStyle={{ textAlign: "center" }}
        title={`${I18n.t("leave.leave_place")}\n${place}`}
        onPress={onPress}
      />
    </View>
  );
};

export default LeaveButton;
