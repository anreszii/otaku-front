import { StyleSheet } from "react-native";
import Button from "shared/ui/button";

export const SignInFooter = () => {
  return <Button variant="contain" title="Войти" style={styles.button} />;
};

const styles = StyleSheet.create({
  button: {
    width: "60%",
  },
});
