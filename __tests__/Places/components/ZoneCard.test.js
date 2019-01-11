import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import * as enzyme from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import ZoneCard from "../../../Components/Places/ZoneCard";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const onPress = jest.fn();
const onPress1 = jest.fn();
const onPress2 = jest.fn();

const checked = true;
const checked1 = false;
const checked2 = true;

it("renders correctly", () => {
  const wrapper = renderer
    .create(
      <ZoneCard
        onPress={onPress}
        onPress1={onPress1}
        onPress2={onPress2}
        checked={checked}
        checked1={checked1}
        checked2={checked2}
      />
    )
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});
