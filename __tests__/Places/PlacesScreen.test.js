import "isomorphic-fetch";
import { ScrollView, ActivityIndicator } from "react-native";
import { ButtonGroup } from "react-native-elements";
import React from "react";
import { expect } from "chai";
import enzyme, { shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import PlacesScreen from "../../views/Places/PlacesScreen";
import FetchPlacesButton from "../../Components/Places/FetchPlacesButton";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const navigation = { navigate: jest.fn(), popToTop: jest.fn() };

it("renders correctly", () => {
  const wrapper = shallow(<PlacesScreen navigation={navigation} />);

  const onPressEvent = jest.fn();

  onPressEvent.mockReturnValue("Link on press invoked");

  // Simulate onPress event on LeaveButton component

  wrapper
    .find(ButtonGroup)
    .at(0)
    .props()
    .onPress();

  wrapper
    .find(ButtonGroup)
    .at(1)
    .props()
    .onPress();

  wrapper
    .find(FetchPlacesButton)
    .first()
    .props()
    .onPress();

  expect(wrapper.find(ScrollView)).to.have.length(1);
  expect(wrapper.find(FetchPlacesButton)).to.have.length(1);
});

it("should render loading component", () => {
  const wrapper = shallow(<PlacesScreen navigation={navigation} />);
  wrapper.setProps({ loading: true });

  expect(wrapper.find(ActivityIndicator)).to.have.length(1);
});
