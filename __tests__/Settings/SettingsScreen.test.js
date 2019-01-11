import "react-native-permissions";
import React from "react";
import { ButtonGroup } from "react-native-elements";
import PhotoUpload from "react-native-photo-upload";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import { ScrollView } from "react-native";
import "react-native-qrcode-scanner";
import Adapter from "enzyme-adapter-react-16";
import {
  SettingsScreen,
  ModalComponent
} from "../../views/Settings/SettingsScreen";
import DeconnectionButton from "../../Components/Settings/DeconnectionButton";

Enzyme.configure({ adapter: new Adapter() });

const navigation = { navigate: jest.fn(), popToTop: jest.fn() };

it("renders correctly", () => {
  const wrapper = shallow(
    <SettingsScreen navigation={navigation} logOut={jest.fn()} />
  );

  wrapper.saveRemote = jest.fn();

  const onPressEvent = jest.fn();

  onPressEvent.mockReturnValue("Link on press invoked");

  // Simulate onPress event on ManualInsertionCard component

  wrapper
    .find(DeconnectionButton)
    .first()
    .props()
    .onPress();

  // wrapper
  //   .find(ModalComponent)
  //   .first()
  //   .props().visible;

  wrapper
    .find(ButtonGroup)
    .first()
    .props()
    .onPress();

  wrapper
    .find(PhotoUpload)
    .first()
    .props()
    .onPhotoSelect();

  wrapper
    .find(PhotoUpload)
    .first()
    .props()
    .onPhotoSelect();

  expect(wrapper.find(ScrollView)).to.have.length(1);
});
