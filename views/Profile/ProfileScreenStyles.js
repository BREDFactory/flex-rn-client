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
  view: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  view_third: {
    borderRadius: 4,
    borderWidth: 0.5
  },
  sendContainer: {
    marginRight: 50,
    marginLeft: 50,
    marginTop: 20
  },
  view_fourth: {
    marginTop: 20,
    borderRadius: 4,
    borderWidth: 0.5
  },
  scanQRCode: {
    marginLeft: 10,
    marginTop: 20
  },
  view_fifth: {
    marginTop: 20,
    borderRadius: 4,
    borderWidth: 0.5
  },
  emptyPlaces_container: {
    marginLeft: 50,
    marginRight: 50
  },
  logOut: {},
  places: {
    fontSize: 15
  },
  debug: {
    textAlign: "center",
    color: "#2E89AD",
    margin: 10,
    fontFamily: "Raleway"
  }
});
