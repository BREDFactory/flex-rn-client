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
