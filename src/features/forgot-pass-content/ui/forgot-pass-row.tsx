import { View, Text, StyleSheet } from "react-native";
import { Field } from "shared/index";
import Typography from "shared/ui/typography";

export const ForgotPassRow = () => {
  return (
    <View>
      <Typography variant="title-medium" style={styles.title}>
        Сбросить пароль
      </Typography>
      <Field placeholder="Электронная почта" />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
});
