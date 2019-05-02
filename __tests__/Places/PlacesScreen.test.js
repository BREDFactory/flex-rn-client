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
import "isomorphic-fetch";
import { ScrollView, ActivityIndicator } from "react-native";
import { ButtonGroup } from "react-native-elements";
import React from "react";
import { expect } from "chai";
import enzyme, { shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import PlacesScreen from "../../views/Places/PlacesScreen";
import FetchPlacesButton from "../../Components/Places/FetchPlacesButton";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const navigation = { navigate: jest.fn(), popToTop: jest.fn() };

it("renders correctly", () => {
  const wrapper = shallow(<PlacesScreen navigation={navigation} />);

  const onPressEvent = jest.fn();

  onPressEvent.mockReturnValue("Link on press invoked");

  // Simulate onPress event on LeaveButton component

  wrapper
    .find(ButtonGroup)
    .at(0)
    .props()
    .onPress();

  wrapper
    .find(ButtonGroup)
    .at(1)
    .props()
    .onPress();

  wrapper
    .find(FetchPlacesButton)
    .first()
    .props()
    .onPress();

  expect(wrapper.find(ScrollView)).to.have.length(1);
  expect(wrapper.find(FetchPlacesButton)).to.have.length(1);
});

it("should render loading component", () => {
  const wrapper = shallow(<PlacesScreen navigation={navigation} />);
  wrapper.setProps({ loading: true });

  expect(wrapper.find(ActivityIndicator)).to.have.length(1);
});

function removeItem(arr, i) {
  arr.splice(i, 1)
  return arr
}

it ("should handle list", async () => {
  const wrapper = shallow(<PlacesScreen navigation={navigation} />);
  await wrapper.setState({ debug: "" });

  expect(wrapper.instance().handleList()).to.equal("");

  const debug = [
    { id: "4-R-RER10" },
    { id: "4-V-RER10" },
    { id: "3-B-RER10" }
  ];
  await wrapper.setState({ debug: debug, selectedFloorIndex: 1, selectedZoneIndex: 0 });
  expect(wrapper.instance().handleList()).to.deep.equal([debug[1]]);
  await wrapper.setState({ debug: debug, selectedFloorIndex: 0, selectedZoneIndex: 1 });
  expect(wrapper.instance().handleList()).to.deep.equal([debug[2]]);
  await wrapper.setState({ debug: debug, selectedFloorIndex: 1, selectedZoneIndex: 2 });
  expect(wrapper.instance().handleList()).to.deep.equal([debug[0]]);
})