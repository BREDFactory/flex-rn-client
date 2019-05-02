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
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  selectorContainer: {
    elevation: 2,
    padding: 15,
    margin: 20,
    marginBottom: 0,
    borderRadius: 10,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: "#3662A0",
    shadowOffset: { height: 1, width: 0 }
	},
	label: {
		textAlign: "center",
		fontSize: 18,
		fontFamily: "Raleway",
		color: "black",
		fontWeight: "bold",
		marginBottom: 10
	}
});
