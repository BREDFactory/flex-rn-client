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
jest.useFakeTimers();

import { ScrollView, TouchableOpacity, ActivityIndicator, AsyncStorage } from "react-native";
import { Input, ListItem } from "react-native-elements";
import React from "react";
import { expect } from "chai";
import enzyme, { shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import UsersScreen from "../../views/Users/UsersScreen";
import ListPlaces from "../../Components/Users/ListPlaces";
import "isomorphic-fetch";

jest.mock("../../Navigation/NavigationApp", () => ({
  NavigationApp: {
    router: {
      getStateForAction: jest.fn(),
      getActionForPathAndParams: jest.fn()
    }
  }
}));

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const navigation = { navigate: jest.fn(), popToTop: jest.fn() };

it("renders correctly", () => {
  const wrapper = shallow(<UsersScreen navigation={navigation} />);

  const users = [
    {
      name: "Test",
      fname: "Test",
      id_place: "TestID",
      photo: ""
    },
    {
      name: "Test2",
      fname: "Test2",
      id_place: "TestID2",
      photo: ""
    }
  ];
  wrapper.setState({ arrayOfFriends: users, loading: false });

  wrapper.getUsers = jest.fn();

  const onPressEvent = jest.fn();

  onPressEvent.mockReturnValue("Link on press invoked");

  // Simulate onPress event on TouchableOpacity component

  wrapper
    .find(TouchableOpacity)
    .at(0)
    .props()
    .onPress();

  wrapper.componentDidMount = jest.fn();

  if (wrapper.state().loading === true) {
    expect(wrapper.find(ActivityIndicator).exists()).to.equal(true);
  }

  wrapper
    .find(Input)
    .first()
    .props()
    .onChangeText("test");

  wrapper.setState({ users, arrayOfFriends: users, loading: false });
  expect(wrapper.state().loading).to.equal(false);

  expect(wrapper.find(ListItem)).to.have.length(2);

  // wrapper
  //   .find(ListPlaces)
  //   .first()
  //   .props().handleList;

  wrapper
    .find(ListPlaces)
    .first()
    .props()
    .prop1();

  expect(wrapper.find(ListPlaces).exists()).to.equal(true);

  expect(wrapper.find(ScrollView)).to.have.length(1);
  expect(wrapper.find(TouchableOpacity)).to.have.length(3);

  const friend = { user: { friend: "" } };
  fetch = jest.fn(() => new Promise(resolve => resolve({ json: jest.fn(() => new Promise(resolve => resolve(friend))) })));
  AsyncStorage.setItem = jest.fn();

  wrapper
    .find(TouchableOpacity)
    .at(1)
    .props()
    .onPress();

  expect(fetch.mock.calls).to.have.length(1);
});
