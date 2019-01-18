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
  place_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  user_view: {
    // backgroundColor: "white",
    // borderRadius: 5,
    // borderColor: "#2E89AD",
    // borderWidth: 2,
    // height: 50,
    // margin: 20
  },
  user: {
    textAlign: "center",
    color: "#2E89AD",
    margin: 5,
    marginTop: 8,
    fontSize: 20,
    fontFamily: "Raleway"
  },
  place: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15
  }
});
