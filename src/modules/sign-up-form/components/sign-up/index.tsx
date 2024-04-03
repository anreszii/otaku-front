import { Content } from "components/layouts/content";
import { SignUpHeader } from "modules/sign-up-form/components/sign-up/sign-up-header";
import { SignUpRow } from "modules/sign-up-form/components/sign-up/sign-up-row";
import { StyleSheet, View } from "react-native";

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
