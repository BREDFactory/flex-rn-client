import "react-native-permissions";
import React from "react";
import { View } from "react-native";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import "react-native-qrcode-scanner";
import Adapter from "enzyme-adapter-react-16";
import DeconnectionButton from "../../../Components/Settings/DeconnectionButton";

Enzyme.configure({ adapter: new Adapter() });

const onPress = jest.fn();

it("renders correctly", () => {
  const wrapper = shallow(<DeconnectionButton onPress={onPress} />);

  expect(wrapper.find(View)).to.have.length(1);
});
