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
import { ButtonGroup } from "react-native-elements";

class PlacesSelector extends React.Component {

  constructor() {
    super();
  }

  render() {
    const { onPress, selectedIndex, buttons } = this.props;
    return(
      <ButtonGroup
        buttons={buttons}
        onPress={onPress}
        selectedIndex={selectedIndex}
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
      />
    );
  }
}

export default PlacesSelector;