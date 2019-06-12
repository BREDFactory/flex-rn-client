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
import "isomorphic-fetch";
import { ScrollView, ActivityIndicator, AsyncStorage } from "react-native";
import { ButtonGroup } from "react-native-elements";
import React from "react";
import { expect } from "chai";
import enzyme, { shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import PlacesScreen from "../../views/Places/PlacesScreen";
import FetchPlacesButton from "../../Components/Places/FetchPlacesButton";
import PlacesSelector from "../../Components/Places/PlacesSelector";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const navigation = { navigate: jest.fn(), popToTop: jest.fn() };

it("renders correctly", () => {
  const backup = AsyncStorage.getItem;
  AsyncStorage.getItem = jest.fn((_, f) => f(null, "{\"id\": \"test\"}"));
  const testArr = [{ using: true }];
  fetch = jest.fn(() => { return { then: f => f({ json: () => { return { then: f => f(testArr) } } }) } });

  const wrapper = shallow(<PlacesScreen navigation={navigation} />);

  AsyncStorage.getItem = backup;

  const onPressEvent = jest.fn();

  onPressEvent.mockReturnValue("Link on press invoked");

  // Simulate onPress event on LeaveButton component

  wrapper
    .find(PlacesSelector)
    .at(0)
    .props()
    .onPress()

  wrapper
    .find(PlacesSelector)
    .at(1)
    .props()
    .onPress()

  wrapper
    .find(PlacesSelector)
    .at(2)
    .props()
    .onPress()

  const places = [
    { using: true, semi_flex: false, start_date: new Date(), end_date: new Date() },
    { using: false, semi_flex: true, start_date: new Date(), end_date: new Date() }
  ]
  fetch = jest.fn(() => { return { then: f => f({ json: () => { return { then: f => f(places) } } }) } });

  wrapper
    .find(FetchPlacesButton)
    .first()
    .props()
    .onPress();


  expect(wrapper.find(ScrollView)).to.have.length(1);
  expect(wrapper.find(FetchPlacesButton)).to.have.length(1);

  wrapper.unmount();
});

it("should render loading component", () => {
  const wrapper = shallow(<PlacesScreen navigation={navigation} />);
  wrapper.setProps({ loading: true });

  expect(wrapper.find(ActivityIndicator)).to.have.length(1);
});