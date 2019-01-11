import { Card, CheckBox } from "react-native-elements";
import React from "react";
import I18n from "../../i18n/i18n";

const ZoneCard = (props: {
  checked: any,
  onPress: () => void,
  checked1: any,
  onPress1: () => void,
  checked2: any,
  onPress2: () => void,
}) => {
  const {
    checked,
    onPress,
    checked1,
    onPress1,
    checked2,
    onPress2,
  } = props;
  return (
    <Card>
      <CheckBox
        center
        title={I18n.t("places.red")}
        checkedIcon="dot-circle-o"
        checkedColor="#2E89AD"
        uncheckedIcon="circle-o"
        checked={checked}
        onPress={onPress}
      />
      <CheckBox
        center
        title={I18n.t("places.blue")}
        checkedIcon="dot-circle-o"
        checkedColor="#2E89AD"
        uncheckedIcon="circle-o"
        checked={checked1}
        onPress={onPress1}
      />
      <CheckBox
        center
        title={I18n.t("places.green")}
        checkedIcon="dot-circle-o"
        checkedColor="#2E89AD"
        uncheckedIcon="circle-o"
        checked={checked2}
        onPress={onPress2}
      />
    </Card>
  );
};

export default ZoneCard;
