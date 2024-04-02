import { StyleSheet, View } from "react-native";
import { Content } from "shared/index";
import { SignUpHeader, SignUpRow } from "features/sign-up-content";

export const SignUpCard = () => {
  return (
    <View style={styles.container}>
      <Content>
        <SignUpHeader />
        <SignUpRow />
      </Content>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
});
