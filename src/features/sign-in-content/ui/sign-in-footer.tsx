import { StyleSheet } from "react-native";
import { Button } from "shared/index";

export const SignInFooter = () => {
  return <Button variant="contain" title="Войти" style={styles.button} />;
};

const styles = StyleSheet.create({
  button: {
    width: "65%",
  },
});
