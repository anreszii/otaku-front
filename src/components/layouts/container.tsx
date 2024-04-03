import {
  View,
  SafeAreaView,
  StyleSheet,
  ViewProps,
  Dimensions,
} from "react-native";

interface Props extends ViewProps {}

export const Container = ({ children, style, ...props }: Props) => {
  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={[style, styles.container]} {...props}>
        {children}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#0B1218",
    width: "100%",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    width: Dimensions.get("screen").width - 48,
  },
});
