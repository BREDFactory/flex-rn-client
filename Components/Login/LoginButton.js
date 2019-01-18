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
import React from "react";
import styles from "../../views/Login/LoginScreenStyles";
import I18n from "../../i18n/i18n";

const LoginButton = (props: { onPress: () => void }) => {
  const { onPress } = props;
  return (
    <View style={styles.button_container}>
      <Button
        style={styles.button_login}
        fontWeight="bold"
        fontFamily="Raleway"
        borderRadius={15}
        buttonStyle={{
          borderWidth: 1,
          borderColor: "#2E89AD"
        }}
        backgroundColor="#fff"
        color="#2E89AD"
        title={I18n.t("login.title").toUpperCase()}
        onPress={onPress}
        containerStyle={{ marginTop: 20 }}
      />
    </View>
  );
};

export default LoginButton;
