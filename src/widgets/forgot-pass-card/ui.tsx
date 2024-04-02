import { ForgotPassBottom, ForgotPassRow } from "features/forgot-pass-content";
import { StyleSheet, View } from "react-native";
import { Content } from "shared/index";

export const ForgotPassCard = () => {
  return (
    <View style={styles.container}>
      <Content>
        <ForgotPassRow />
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
