import { StyleSheet } from "react-native";
import Button from "shared/ui/button";

export const SignUpFooter = () => {
  return (
    <Button variant="contain" title="Создать аккаунт" style={styles.button} />
  );
};

const styles = StyleSheet.create({
  button: {
    width: "65%",
  },
});
