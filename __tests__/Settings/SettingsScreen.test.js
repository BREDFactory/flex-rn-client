/*
Copyright 2019-2020 BRED Banque Populaire

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import "react-native-permissions";
import React from "react";
import { ButtonGroup } from "react-native-elements";
import PhotoUpload from "react-native-photo-upload";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import { ScrollView, AsyncStorage } from "react-native";
import "react-native-qrcode-scanner";
import Adapter from "enzyme-adapter-react-16";
import {
  SettingsScreen,
  ModalComponent,
  ProfileDescription
} from "../../views/Settings/SettingsScreen";
import DeconnectionButton from "../../Components/Settings/DeconnectionButton";
import reducer, { fetchPhoto, logOut } from "../../Navigation/components/reducer";

jest.useFakeTimers();

Enzyme.configure({ adapter: new Adapter() });

const navigation = { navigate: jest.fn(), popToTop: jest.fn(), dispatch: jest.fn(), setParams: jest.fn() };

it("renders correctly", async () => {
  AsyncStorage.getItem = jest.fn((_, f) => f(null, "{ \"test\": \"test\"}"));
  fetch = jest.fn(() => { return { then: f => f({ json: () => { return { then: f => f({ test: "test"}) } } }) } });
  const wrapper = shallow(
    <SettingsScreen navigation={navigation} fetchPhoto={fetchPhoto} logOut={logOut} />
  );

  wrapper.saveRemote = jest.fn();

  const onPressEvent = jest.fn();

  onPressEvent.mockReturnValue("Link on press invoked");

  // Simulate onPress event on ManualInsertionCard component

  AsyncStorage.removeItem = jest.fn();

  wrapper
    .find(DeconnectionButton)
    .first()
    .props()
    .onPress();

  expect(AsyncStorage.removeItem.mock.calls).to.have.length(1);
  expect(AsyncStorage.removeItem.mock.calls[0][0]).to.equal("USER");

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
    .onPhotoSelect("test");

  wrapper
    .find(ModalComponent)
    .first()
    .dive()

  wrapper
    .find(ProfileDescription)
    .first()
    .dive()

  expect(wrapper.find(ScrollView)).to.have.length(1);

  const data = {
    photo: "photo",
    id_place: "id_place"
  };
  fetch = jest.fn(function(url) {
    if (url.indexOf("users") != -1) {
      return {
        then: (resolve => {
          return resolve({
          json: jest.fn(() => {
            return {
            then: (resolve => {
              return resolve(data)})
          }})
        })})
      };
    } else {
      return new Promise(resolve => resolve({ json: jest.fn(() => new Promise(resolve => resolve(data))) }));
    }
  })
  AsyncStorage.setItem = jest.fn();
  // wrapper.setProps({ fetchPhoto: jest.fn() });

  await wrapper
    .instance()
    .saveRemote()

  jest.runAllTimers();

  expect(fetch.mock.calls).to.have.length(5);
  expect(AsyncStorage.setItem.mock.calls).to.have.length(3);
  expect(AsyncStorage.setItem.mock.calls[0][0]).to.equal("USER");
});

it('abc', () => {
  const payload = { photo: "test" };
  expect(reducer({ photo: "test" }, { type: "flex-office/photo/FETCH", payload })).to.deep.equal({ photo: "test" });
  expect(reducer({ photo: "test" }, { type: "flex-office/user/LOGOUT", payload })).to.deep.equal({ photo: "test" });
  expect(reducer({ photo: "test" }, { type: "test", payload })).to.deep.equal({ photo: "test" });
})