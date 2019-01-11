jest.useFakeTimers();

import { ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { FormInput, ListItem } from "react-native-elements";
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
    .find(FormInput)
    .first()
    .props()
    .onChangeText("test");

  wrapper.setState({ users, arrayOfFriends: users, loading: false });
  expect(wrapper.state().loading).to.equal(false);

  // wrapper
  //   .find(TouchableOpacity)
  //   .first()
  //   .props()
  //   .onPress();

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
});
