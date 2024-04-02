import { StyleSheet } from "react-native";
import { Button } from "shared/index";

export const ForgotPassBottom = () => {
  return (
    <Button variant="contain" title="Сбросить пароль" style={styles.button} />
  );
};

const styles = StyleSheet.create({
  button: {
    width: "65%",
  },
});
