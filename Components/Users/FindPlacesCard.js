import { View } from "react-native";
import { Button } from "react-native-elements";
import I18n from "react-native-i18n";
import React from "react";
import styles from "./styles/FindPlacesCardStyle";

const FindPlacesCard = (props: { users: any }) => {
  const { users } = props;
  return (
    <View style={styles.view}>
      <Button
        fontWeight="bold"
        fontFamily="Raleway"
        iconRight={{
          name: "sync",
          type: "font-awesome5",
          color: "#2E89AD"
        }}
        large={false}
        borderRadius={15}
        buttonStyle={{
          borderWidth: 0.5,
          borderColor: "#2E89AD"
        }}
        backgroundColor="#fff"
        color="#2E89AD"
        style={styles.free_places}
        title={I18n.t("users.users")}
        onPress={users}
      />
    </View>
  );
};

export default FindPlacesCard;
