jest.useFakeTimers();

import React from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import enzyme, { shallow } from "enzyme";
import { expect } from "chai";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import QRCodeComponent from "../../../Components/Profile/components/QRCodeComponent";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const onRead = jest.fn();

it("renders correctly", () => {
  const wrapper = shallow(<QRCodeComponent onRead={onRead} />);

  expect(wrapper.find(QRCodeScanner)).to.have.length(1);
});
