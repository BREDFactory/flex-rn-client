jest.useFakeTimers();

import React from "react";
import { View } from "react-native";
import enzyme, { shallow } from "enzyme";
import { expect } from "chai";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import ManualInsertionCard from "../../../Components/Profile/components/ManualInsertionCard";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const onChangeText = jest.fn();
const onPress = jest.fn();

it("renders correctly", () => {
  const wrapper = shallow(
    <ManualInsertionCard onChangeText={onChangeText} onPress={onPress} />
  );

  expect(wrapper.find(View)).to.have.length(1);
});
