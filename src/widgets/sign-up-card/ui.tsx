import { StyleSheet, View } from "react-native";
import { Content } from "shared/index";
import {
  SignUpFooter,
  SignUpHeader,
  SignUpRow,
} from "features/sign-up-content";

export const SignUpCard = () => {
  return (
    <View style={styles.container}>
      <Content>
        <SignUpHeader />
        <SignUpRow />
      </Content>
      <SignUpFooter />
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
