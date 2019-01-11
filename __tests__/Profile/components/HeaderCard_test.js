import React from "react";
import { View } from "react-native";
import enzyme, { shallow } from "enzyme";
import { expect } from "chai";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import HeaderCard from "../../../Components/Profile/components/HeaderCard";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

it("renders correctly", () => {
  const wrapper = shallow(
    <HeaderCard fname="FName Test" name="Name Test" id="testID" />
  );

  expect(wrapper.find(View)).to.have.length(1);
});
