import { Content } from "components/layouts/content";
import { SignInTitle } from "modules/sign-in-form/components/sign-in-header";
import { SignInRow } from "modules/sign-in-form/components/sign-in-row";
import { StyleSheet, View } from "react-native";
import { Button } from "ui/button";

export const SignInCard = () => {
  return (
    <View style={styles.container}>
      <Content>
        <SignInTitle />
        <SignInRow />
      </Content>
      <Button variant="contain" title="Войти" style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "75%",
  },
  button: {
    width: "65%",
  },
});
