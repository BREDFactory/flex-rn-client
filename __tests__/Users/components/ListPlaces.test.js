import { View } from "react-native";
import React from "react";
import renderer from "react-test-renderer";
import * as enzyme from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import ListPlaces from "../../../Components/Users/ListPlaces";

jest.useFakeTimers();
enzyme.configure({ adapter: new ReactSixteenAdapter() });

it("renders correctly", () => {
  const wrapper = renderer
    .create(
      <ListPlaces
        key={1}
        handleList={[1, 2, 3, 4, 5]}
        prop1={event => <View>{event}</View>}
      />
    )
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});
