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
import { Button, Card } from "react-native-elements";
import { View } from "react-native";
import React from "react";
import I18n from "../../../i18n/i18n";
import styles from "./styles/QRCodeCardStyle";

const QRCodeCard = (props: { onPress: () => any }) => {
  const { onPress } = props;
  return (
    <Card title={I18n.t("profile.scan_qr_code")}>
      <View style={styles.scan_container}>
        <Button
          fontWeight="bold"
          fontFamily="Raleway"
          borderRadius={15}
          backgroundColor="#2E89AD"
          color="#fff"
          style={styles.scan}
          title={I18n.t("profile.scan")}
          onPress={onPress}
        />
      </View>
    </Card>
  );
};

export default QRCodeCard;
