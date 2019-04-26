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
import { View, TouchableNativeFeedback } from "react-native";
import { Button } from "react-native-elements";
import React from "react";
import I18n from "../../i18n/i18n";

const LoginButton = (props: { onPress: () => void }) => {
  const { onPress } = props;
  return (
    <View>
      <Button
        type="clear"
        containerStyle={{ 
          borderRadius: 15,
          borderWidth: 1,
          borderColor: "#2E89AD",
          marginTop: 30,
          marginLeft: 15,
          marginRight: 15
        }}
        buttonStyle={{
          padding: 10
        }}
        titleStyle={{
          fontWeight: "bold",
          fontFamily: "Raleway",
          color: "#2E89AD"
        }}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        style={{ borderRadius: 15 }}
        title={I18n.t("login.title").toUpperCase()}
        onPress={onPress}
      />
    </View>
  );
};

export default LoginButton;
