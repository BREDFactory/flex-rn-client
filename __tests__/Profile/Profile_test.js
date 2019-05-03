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
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import { ScrollView, Text, ActivityIndicator, AsyncStorage } from "react-native";
import "react-native-qrcode-scanner";
import Adapter from "enzyme-adapter-react-16";
import ProfileScreen from "../../views/Profile/ProfileScreen";
import * as mockCamera from "../../__mocks__/react-native-camera";
import ManualInsertionCard from "../../Components/Profile/components/ManualInsertionCard";
import LeaveButton from "../../Components/Profile/components/LeaveButton";
import QRCodeComponent from "../../Components/Profile/components/QRCodeComponent";
import HeaderCard from "../../Components/Profile/components/HeaderCard";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-native-camera", () => mockCamera);

const navigation = { navigate: jest.fn(), popToTop: jest.fn(), setParams: jest.fn(), addListener: jest.fn() };

it("renders correctly", async () => {
  fetch = jest.fn(() => { return { then: resolve => resolve({ status: 200 }) } });
  AsyncStorage.setItem = jest.fn();
  AsyncStorage.getItem = jest.fn((_, f) => f(null, "{ \"place\": \"test\" }"));
  let wrapper = shallow(<ProfileScreen navigation={navigation} />);

  wrapper.setState({ placeTaken: "3-R-RER29", place: true });

  const onPressEvent = jest.fn();

  onPressEvent.mockReturnValue("Link on press invoked");

  // Simulate onPress event on ManualInsertionCard component

  wrapper
    .dive()
    .dive()
    .find(LeaveButton)
    .first()
    .props()
    .onPress();

  expect(AsyncStorage.setItem.mock.calls).to.have.length(1);
  expect(AsyncStorage.setItem.mock.calls[0][0]).to.equal("USER");

  wrapper = shallow(<ProfileScreen navigation={navigation} />);

  wrapper.setState({ placeTaken: "3-R-RER29", place: true });

  fetch = jest.fn(() => new Promise(resolve => resolve()));

  wrapper.setState({ place: false });

  // expect(
  //   wrapper
  //     .dive()
  //     .dive()
  //     .find(ActivityIndicator)
  // ).to.have.length(1);

  wrapper.setState({ placeTaken: null });
  wrapper.setState({ isWrongFormatPlace: true });

  expect(
    wrapper
      .dive()
      .dive()
      .find(HeaderCard)
  ).to.have.length(1);

  expect(
    wrapper
      .dive()
      .dive()
      .find(ScrollView)
  ).to.have.length(1);

  wrapper
    .dive()
    .dive()
    .find(ManualInsertionCard)
    .first()
    .props()
    .onChangeText("");

  fetch = jest.fn(() => { return { then: resolve => resolve({ status: 200 }) } });

  wrapper
    .dive()
    .dive()
    .find(ManualInsertionCard)
    .first()
    .props()
    .onSubmitEditing();

  wrapper
    .dive()
    .dive()
    .find(ManualInsertionCard)
    .first()
    .props()
    .onPress();

  wrapper
    .dive()
    .dive()
    .find(QRCodeComponent)
    .first()
    .props()
    .onRead({ data: "abc"});

  fetch = jest.fn(() => { return { then: resolve => resolve({ status: 400, text }) } });

  const text = jest.fn(() => { return { then: () => undefined } });

  wrapper
    .dive()
    .dive()
    .find(LeaveButton)
    .first()
    .props()
    .onPress();

  expect(text.mock.calls).to.have.length(1);

  const json = jest.fn(() => { return { then: f => f({ fname: "a a", name: "a" })}})
  fetch = jest.fn(() => { return { then: resolve => resolve({ status: 500, json }) } });

  await wrapper.setState({ place: "", isWrongFormatPlace: true });

  wrapper
    .dive()
    .dive()
    .find(QRCodeComponent)
    .first()
    .props()
    .onRead({ data: "abc"});

  expect(
    wrapper
      .dive()
      .dive()
      .find(Text)
  ).to.have.length(1);

  // expect(wrapper.find(Content)).to.have.length(1);

  // expect(wrapper.find(ScrollView)).to.have.length(1);
  // expect(wrapper.find(ManualInsertionCard)).to.have.length(1);
});
