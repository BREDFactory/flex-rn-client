import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles/FetchPlacesButtonStyle";

const FetchPlacesButton = (props: { onPress: () => void }) => {
  const { onPress } = props;
  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text
          style={{
            color: "#2E89AD",
            fontFamily: "Raleway",
            fontWeight: "bold"
          }}
        >
          Je recherche une place
        </Text>
        <Icon name="arrow-right" size={15} color="#2E89AD" />
      </TouchableOpacity>
    </View>
  );
};

export default FetchPlacesButton;
