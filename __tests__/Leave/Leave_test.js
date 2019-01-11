import "react-native";
import "isomorphic-fetch";
import React from "react";
import { expect } from "chai";
import LinearGradient from "react-native-linear-gradient";
import * as enzyme from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import LeaveScreen from "../../views/Leave/LeaveScreen";
import LeaveButton from "../../Components/Leave/LeaveButton";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const navigation = { navigate: jest.fn(), popToTop: jest.fn() };

it("renders correctly", () => {
  const wrapper = enzyme.shallow(<LeaveScreen navigation={navigation} />);

  const onPressEvent = jest.fn();

  onPressEvent.mockReturnValue("Link on press invoked");

  // Simulate onPress event on LeaveButton component

  wrapper
    .find(LeaveButton)
    .first()
    .props()
    .onPress();

  expect(wrapper.find(LinearGradient)).to.have.length(1);
  expect(wrapper.find(LeaveButton)).to.have.length(1);
});
