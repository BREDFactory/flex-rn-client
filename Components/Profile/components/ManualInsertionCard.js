import { Button, FormInput } from "react-native-elements";
import { View } from "react-native";
import React from "react";
import I18n from "../../../i18n/i18n";
import styles from "./styles/ManualInsertionCardStyle";

const ManualInsertionCard = (props: {
  onChangeText: any => void,
  onPress: () => void
}) => {
  const { onChangeText, onPress } = props;
  return (
    <View style={styles.view}>
      <FormInput
        inputStyle={{ width: 100, fontFamily: "Raleway" }}
        style={styles.place}
        placeholder={I18n.t("profile.place")}
        onChangeText={onChangeText}
      />
      <Button
        fontWeight="bold"
        fontFamily="Raleway"
        buttonStyle={{
          elevation: 2,
          borderRadius: 15,
          backgroundColor: "#fff",
          shadowOpacity: 0.4,
          shadowRadius: 2,
          shadowColor: "#3662A0",
          shadowOffset: { height: 1, width: 0 }
        }}
        color="#2E89AD"
        style={styles.send}
        title={I18n.t("profile.send")}
        onPress={onPress}
      />
    </View>
  );
};

export default ManualInsertionCard;
