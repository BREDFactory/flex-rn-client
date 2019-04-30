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
// @flow

import React from "react";
import { AsyncStorage, View, Image, Text } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";

import logo from "../../assets/logo.png";

class SplashScreen extends React.Component {

  constructor() {
		super();
	}
	
	componentDidMount() {
		const { navigation } = this.props;
		AsyncStorage.getItem("USER", (err, result) => {
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: err || !result ? "Login" : "Profile" })]
			});
			setTimeout(() => navigation.dispatch(resetAction), 1000);
		});
	}

  render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
				<Image source={logo} style={{ height: "30%" }} resizeMode="contain" />
				<Text style={{ marginTop: 30, fontFamily: "Raleway", fontSize: 30, color: "#2E89AD" }}>
					Flex-Office
				</Text>
			</View>
		);
  }
}

export default SplashScreen;
