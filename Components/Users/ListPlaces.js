import { List } from "react-native-elements";
import React from "react";

const ListPlaces = (props: { handleList: any, prop1: any => null }) => {
  const { handleList, prop1 } = props;
  return (
    <List containerStyle={{ marginBottom: 20 }}>{handleList.map(prop1)}</List>
  );
};

export default ListPlaces;
