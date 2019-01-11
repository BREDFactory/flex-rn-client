// @flow
import { NavigationScreenProp } from "react-navigation";

type Historical = {
  place_id: string,
  begin: string,
  end: string
};

export type State = {
  name: string,
  fname: string,
  id: string,
  place: string,
  historical: Array<Historical>,
  debug: Array<any> | string
};

export type Props = {
  navigation: NavigationScreenProp<{}>
};
