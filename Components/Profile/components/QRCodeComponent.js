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
// import { NavigationEvents } from "react-navigation";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Text } from "react-native";
import I18n from "../../../i18n/i18n";

type Props = {
  onRead: () => any
};

class QRCodeComponent extends React.Component<Props> {
  reactivateOnce = false;

  render() {
    const { onRead } = this.props;
    return (
      <QRCodeScanner
        onRead={onRead}
        showMarker
        cameraProps={{ captureAudio: false }}
        markerStyle={{
          height: 250,
          width: 250,
          borderWidth: 2,
          borderColor: "white",
          backgroundColor: "transparent"
        }}
        topContent={
          <Text
            style={{
              marginBottom: 15,
              fontFamily: "Raleway"
            }}
          >
            {I18n.t("scan.scan_qr_code")}
          </Text>
        }
      />
    );
  }
}

export default QRCodeComponent;
