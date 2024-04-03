import { Content } from "components/layouts/content";
import { ForgotPassRow } from "modules/forgot-pass-form/components/forgot-pass-row";
import { StyleSheet, View } from "react-native";

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
