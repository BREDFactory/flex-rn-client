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
import { Input } from "react-native-elements";
import React from "react";
import styles from "../../views/Login/LoginScreenStyles";
import I18n from "../../i18n/i18n";

const InputLogin = (props: {
  onChangeText: any => void,
  onChangeText1: any => void,
  onChangeText2: any => void
}) => {
  const { onSubmitEditing, onChangeText, onChangeText1, onChangeText2 } = props;
  return (
    <View>
      <Input
        containerStyle={{ marginTop: 10, paddingLeft: 15, paddingRight: 15 }}
        inputContainerStyle= {{ height: 40 }}
        placeholder={I18n.t("login.name")}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        inputStyle={{ fontFamily: "Raleway", fontSize: 16, paddingBottom: 2, paddingLeft: 0 }}
      />

      <Input
        containerStyle={{ marginTop: 10, paddingLeft: 15, paddingRight: 15 }}
        inputContainerStyle= {{ height: 40 }}
        placeholder={I18n.t("login.surname")}
        onChangeText={onChangeText1}
        onSubmitEditing={onSubmitEditing}
        inputStyle={{ fontFamily: "Raleway", fontSize: 16, paddingBottom: 2, paddingLeft: 0 }}
      />

      <Input
        containerStyle={{ marginTop: 10, paddingLeft: 15, paddingRight: 15 }}
        inputContainerStyle= {{ height: 40 }}
        placeholder={I18n.t("login.id")}
        onChangeText={onChangeText2}
        onSubmitEditing={onSubmitEditing}
        inputStyle={{ fontFamily: "Raleway", fontSize: 16, paddingBottom: 2, paddingLeft: 0 }}
      />
    </View>
  );
};

export default InputLogin;
