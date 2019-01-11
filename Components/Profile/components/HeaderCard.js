import { View } from "react-native";
import { Text } from "react-native-elements";
import React from "react";
import styles from "./styles/HeaderCardStyle";

const HeaderCard = (props: { fname: string, name: string, id: string }) => {
  const { fname, name, id } = props;
  return (
    <View style={styles.view_second}>
      <Text h4 style={styles.text_first}>
        {fname} {name} [{id}]
      </Text>
    </View>
  );
};

export default HeaderCard;
