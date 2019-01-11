import { StyleSheet } from "react-native";

export default StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
    fontFamily: "Raleway"
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
    fontFamily: "Raleway"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
    fontFamily: "Raleway"
  },
  buttonTouchable: {
    padding: 16
  },
  scrollViewContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  viewContainer: {
    backgroundColor: "#fff",
    elevation: 2,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: "#3662A0",
    shadowOffset: { height: 1, width: 0 },
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    height: 100,
    borderRadius: 5
  },
  viewContainerRemote: {
    backgroundColor: "#fff",
    elevation: 2,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: "#3662A0",
    shadowOffset: { height: 1, width: 0 },
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    height: 100,
    borderRadius: 5
  },
  remoteText: {
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    fontFamily: "Raleway"
  }
});
