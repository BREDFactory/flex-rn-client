import "isomorphic-fetch";
import { expect } from "chai";
import { View } from "react-native";
import React from "react";
import enzyme, { shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import FetchPlacesButton from "../../../Components/Places/FetchPlacesButton";

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const navigation = { navigate: jest.fn(), popToTop: jest.fn() };

it("renders correctly", () => {
  const wrapper = shallow(<FetchPlacesButton navigation={navigation} />);

  expect(wrapper.find(View)).to.have.length(1);
});
