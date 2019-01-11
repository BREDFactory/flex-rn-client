import React from "react";
import { View } from "react-native";
import enzyme, { shallow } from "enzyme";
import { expect } from "chai";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import LeaveButton from "../../../Components/Leave/LeaveButton";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const place = "3167I";
const onPress = jest.fn();

it("renders correctly", () => {
  const wrapper = shallow(<LeaveButton place={place} onPress={onPress} />);

  expect(wrapper.find(View)).to.have.length(1);
});
