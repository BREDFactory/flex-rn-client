import { View } from "react-native";
import { Button } from "react-native-elements";
import React from "react";
import styles from "../../views/Login/LoginScreenStyles";
import I18n from "../../i18n/i18n";

const LoginButton = (props: { onPress: () => void }) => {
  const { onPress } = props;
  return (
    <View style={styles.button_container}>
      <Button
        style={styles.button_login}
        fontWeight="bold"
        fontFamily="Raleway"
        borderRadius={15}
        buttonStyle={{
          borderWidth: 1,
          borderColor: "#2E89AD"
        }}
        backgroundColor="#fff"
        color="#2E89AD"
        title={I18n.t("login.title").toUpperCase()}
        onPress={onPress}
        containerStyle={{ marginTop: 20 }}
      />
    </View>
  );
};

export default LoginButton;
