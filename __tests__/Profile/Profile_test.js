import "react-native-permissions";
import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import { ScrollView, Text, ActivityIndicator } from "react-native";
import "react-native-qrcode-scanner";
import Adapter from "enzyme-adapter-react-16";
import ProfileScreen from "../../views/Profile/ProfileScreen";
import * as mockCamera from "../../__mocks__/react-native-camera";
import ManualInsertionCard from "../../Components/Profile/components/ManualInsertionCard";
import LeaveButton from "../../Components/Leave/LeaveButton";
import QRCodeComponent from "../../Components/Profile/components/QRCodeComponent";
import HeaderCard from "../../Components/Profile/components/HeaderCard";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-native-camera", () => mockCamera);

const navigation = { navigate: jest.fn(), popToTop: jest.fn() };

it("renders correctly", () => {
  const wrapper = shallow(<ProfileScreen navigation={navigation} />);

  wrapper.setState({ placeTaken: "3-R-RER29" });

  const onPressEvent = jest.fn();

  onPressEvent.mockReturnValue("Link on press invoked");

  // Simulate onPress event on ManualInsertionCard component

  wrapper
    .dive()
    .dive()
    .find(LeaveButton)
    .first()
    .props()
    .onPress();

  // expect(
  //   wrapper
  //     .dive()
  //     .dive()
  //     .find(ActivityIndicator)
  // ).to.have.length(1);

  wrapper.setState({ placeTaken: null });
  wrapper.setState({ isWrongFormatPlace: true });

  expect(
    wrapper
      .dive()
      .dive()
      .find(HeaderCard)
  ).to.have.length(1);

  expect(
    wrapper
      .dive()
      .dive()
      .find(ScrollView)
  ).to.have.length(1);

  wrapper
    .dive()
    .dive()
    .find(ManualInsertionCard)
    .first()
    .props()
    .onChangeText();

  wrapper
    .dive()
    .dive()
    .find(QRCodeComponent)
    .first()
    .props()
    .onRead();

  expect(
    wrapper
      .dive()
      .dive()
      .find(Text)
  ).to.have.length(1);

  // expect(wrapper.find(Content)).to.have.length(1);

  // expect(wrapper.find(ScrollView)).to.have.length(1);
  // expect(wrapper.find(ManualInsertionCard)).to.have.length(1);
});
