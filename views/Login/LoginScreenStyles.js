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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white"
  },
  view_second: {
    width: 250,
    marginTop: 50,
    marginBottom: 30
  },
  textInput: {
    borderRadius: 4,
    borderWidth: 0.5
  },
  button_container: {
    marginTop: 50
  },
  debug: {
    textAlign: "center",
    color: "#5167A4",
    margin: 10
  }
});
