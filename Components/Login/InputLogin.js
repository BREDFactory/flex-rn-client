import { View } from "react-native";
import { FormInput } from "react-native-elements";
import React from "react";
import styles from "../../views/Login/LoginScreenStyles";
import I18n from "../../i18n/i18n";

const InputLogin = (props: {
  onChangeText: any => void,
  onChangeText1: any => void,
  onChangeText2: any => void
}) => {
  const { onChangeText, onChangeText1, onChangeText2 } = props;
  return (
    <View>
      <FormInput
        containerStyle={{ marginTop: 10 }}
        style={styles.textInput}
        placeholder={I18n.t("login.name")}
        onChangeText={onChangeText}
        inputStyle={{ fontFamily: "Raleway" }}
      />

      <FormInput
        containerStyle={{ marginTop: 10 }}
        style={styles.textInput}
        placeholder={I18n.t("login.surname")}
        onChangeText={onChangeText1}
        inputStyle={{ fontFamily: "Raleway" }}
      />

      <FormInput
        containerStyle={{ marginTop: 10 }}
        style={styles.textInput}
        placeholder={I18n.t("login.id")}
        onChangeText={onChangeText2}
        inputStyle={{ fontFamily: "Raleway" }}
      />
    </View>
  );
};

export default InputLogin;
