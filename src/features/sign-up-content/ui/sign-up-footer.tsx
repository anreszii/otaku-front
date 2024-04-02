import { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import Button from "shared/ui/button";

interface Props {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
}

export const SignUpFooter = ({ stage, setStage }: Props) => {
  return (
    <Button
      variant="contain"
      title={stage === 1 ? "Создать аккаунт" : "Продолжить"}
      style={styles.button}
      onPress={() => setStage((prev) => prev + 1)}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: "65%",
    marginTop: 48,
  },
});
