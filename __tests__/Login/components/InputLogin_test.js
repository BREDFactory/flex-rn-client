import React from "react";
import { View } from "react-native";
import enzyme, { shallow } from "enzyme";
import { expect } from "chai";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import InputLogin from "../../../Components/Login/InputLogin";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const onChangeText1 = jest.fn();
const onChangeText2 = jest.fn();
const onChangeText3 = jest.fn();

it("renders correctly", () => {
  const wrapper = shallow(
    <InputLogin
      onChangeText1={onChangeText1}
      onChangeText2={onChangeText2}
      onChangeText3={onChangeText3}
    />
  );

  expect(wrapper.find(View)).to.have.length(1);
});
