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
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
    fontFamily: "Raleway"
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
    fontFamily: "Raleway"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
    fontFamily: "Raleway"
  },
  buttonTouchable: {
    padding: 16
  },
  scrollViewContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  viewContainer: {
    backgroundColor: "#fff",
    elevation: 2,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: "#3662A0",
    shadowOffset: { height: 1, width: 0 },
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    height: 100,
    borderRadius: 5
  },
  viewContainerRemote: {
    backgroundColor: "#fff",
    elevation: 2,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: "#3662A0",
    shadowOffset: { height: 1, width: 0 },
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    height: 100,
    borderRadius: 5
  },
  viewContainerSemiFlex: {
    backgroundColor: "#fff",
    elevation: 2,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: "#3662A0",
    shadowOffset: { height: 1, width: 0 },
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    marginBottom: 0,
    height: 100,
    borderRadius: 5
  },
  remoteText: {
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    fontFamily: "Raleway"
  },
  semiFlexText: {
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    marginBottom: 0,
    fontFamily: "Raleway"
  },
  regularText: {
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    marginBottom: 0,
    fontFamily: "Raleway"
  },
  input: {
    height: 40,
    borderWidth: 0,
    margin: 0
  }
});
