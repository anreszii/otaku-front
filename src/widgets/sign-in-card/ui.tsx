import { Dimensions, StyleSheet, View } from "react-native";
import {
  SignInFooter,
  SignInHeader,
  SignInRow,
} from "features/sign-in-content";
import { Content } from "shared/index";

export const SignInCard = () => {
  return (
    <View style={styles.container}>
      <Content>
        <SignInHeader />
        <SignInRow />
      </Content>
      <SignInFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "75%",
  },
});
