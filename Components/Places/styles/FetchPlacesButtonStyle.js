import { StyleSheet } from "react-native";

export default StyleSheet.create({
  view: {
    marginLeft: 50,
    marginRight: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    elevation: 2,
    backgroundColor: "#fff",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: "#3662A0",
    shadowOffset: { height: 1, width: 0 },
    borderRadius: 17.5,
    width: 230,
    height: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
