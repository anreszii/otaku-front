import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 80,
    marginTop: 16,
    marginRight: 24,
    marginLeft: 24,
  },
  marginBottom16: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: "90%",
  },
  image: {
    width: 160,
    height: 125,
    marginRight: 20,
    borderRadius: 10,
  },
  column: {
    flex: 0,
    width: "50%",
    height: 125,
    justifyContent: "space-between",
  },
  button: {
    width: 80,
    height: 25,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19.6,
  },
  marginRight8: {
    marginRight: 8,
  },
});
