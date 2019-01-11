import React from "react";
import "react-native";
import { Card } from "react-native-elements";
import enzyme, { shallow } from "enzyme";
import { expect } from "chai";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import QRCodeCard from "../../../Components/Profile/components/QRCodeCard";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const onChangeText = jest.fn();
const onPress = jest.fn();

it("renders correctly", () => {
  const wrapper = shallow(
    <QRCodeCard onChangeText={onChangeText} onPress={onPress} />
  );

  expect(wrapper.find(Card)).to.have.length(1);
});
