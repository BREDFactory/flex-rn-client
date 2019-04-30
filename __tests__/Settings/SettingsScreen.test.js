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
import "react-native-permissions";
import React from "react";
import { ButtonGroup } from "react-native-elements";
import PhotoUpload from "react-native-photo-upload";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import { ScrollView } from "react-native";
import "react-native-qrcode-scanner";
import Adapter from "enzyme-adapter-react-16";
import {
  SettingsScreen,
  ModalComponent
} from "../../views/Settings/SettingsScreen";
import DeconnectionButton from "../../Components/Settings/DeconnectionButton";

Enzyme.configure({ adapter: new Adapter() });

const navigation = { navigate: jest.fn(), popToTop: jest.fn(), dispatch: jest.fn() };

it("renders correctly", () => {
  const wrapper = shallow(
    <SettingsScreen navigation={navigation} logOut={jest.fn()} />
  );

  wrapper.saveRemote = jest.fn();

  const onPressEvent = jest.fn();

  onPressEvent.mockReturnValue("Link on press invoked");

  // Simulate onPress event on ManualInsertionCard component

  wrapper
    .find(DeconnectionButton)
    .first()
    .props()
    .onPress();

  // wrapper
  //   .find(ModalComponent)
  //   .first()
  //   .props().visible;

  wrapper
    .find(ButtonGroup)
    .first()
    .props()
    .onPress();

  wrapper
    .find(PhotoUpload)
    .first()
    .props()
    .onPhotoSelect();

  wrapper
    .find(PhotoUpload)
    .first()
    .props()
    .onPhotoSelect();

  expect(wrapper.find(ScrollView)).to.have.length(1);
});
