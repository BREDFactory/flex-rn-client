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
jest.useFakeTimers();

import React from "react";
import { View } from "react-native";
import enzyme, { shallow } from "enzyme";
import { expect } from "chai";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import ManualInsertionCard from "../../../Components/Profile/components/ManualInsertionCard";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const onChangeText = jest.fn();
const onPress = jest.fn();

it("renders correctly", () => {
  const wrapper = shallow(
    <ManualInsertionCard onChangeText={onChangeText} onPress={onPress} />
  );

  expect(wrapper.find(View)).to.have.length(1);
});
