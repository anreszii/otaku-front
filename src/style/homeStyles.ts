import { StyleSheet, Dimensions } from "react-native";

const homeStyles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
    marginHorizontal: 24,
    width: "100%",
  },
  lastWrapper: {
    marginTop: 24,
    marginHorizontal: 24,
    width: "100%",
    marginBottom: 108,
  },
  container: {
    flex: 1,
    marginBottom: 20,
    height: Dimensions.get("window").height + 320,
    backgroundColor: "#FFF",
  },
  scrollView: {
    height: "100%",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    marginRight: 40,
  },
  animeItem: {
    marginRight: 8,
    marginBottom: 16,
  },
  poster: {
    width: 150,
    height: 200,
    borderRadius: 12,
  },
  posterImage: {
    borderRadius: 12,
  },
  posterContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  badgeRating: {
    height: 24,
    width: 36,
    marginTop: 8,
    marginLeft: 8,
  },
  posterNumber: {
    fontSize: 48,
    fontWeight: "600",
    lineHeight: 48,
    marginLeft: 12,
    color: "#FFF",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  titleContainer: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
    color: "#FFF",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    color: "#FFF",
    marginTop: 8,
  },
  bg: {
    width: "100%",
    height: 400,
  },
  infoContainer: {
    position: "absolute",
    bottom: 24,
    left: 24,
    width: "90%",
  },
  playButton: {
    width: 81,
    height: 40,
    marginTop: 8,
    marginRight: 12,
  },
  playButtonText: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19.6,
    letterSpacing: 0.2,
  },
  listButton: {
    width: 101,
    height: 40,
    marginTop: 8,
  },
  listButtonText: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    color: "#FFF",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default homeStyles;
