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
import { TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

class PlaceItem extends React.Component {

  constructor() {
	super();
  }

  render() {
		const { place } = this.props;
	  return (
		  <TouchableOpacity activeOpacity={0.1}>
				<Card
					title={place.id}
					containerStyle={{
						borderRadius: 10
					}}
					wrapperStyle={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center"
					}}
					titleStyle={{ marginBottom: 0, marginRight: 10, fontFamily: "Raleway" }}
					dividerStyle={{ display: "none" }}
				>
					<Icon
						name="circle"
						size={15}
						color={
							place.id[2] === "V" ? "green" : (place.id[2] === "B" ? "blue" : "red")
						}
					/>
				</Card>
		  </TouchableOpacity>
	  );
  }
}

export default PlaceItem;