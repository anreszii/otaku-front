import { Content } from "components/layouts/content";
import { InterestsHeader } from "modules/sign-up-form/components/interests/interests-header";
import { InterestsRow } from "modules/sign-up-form/components/interests/interests-row";
import { StyleSheet, View } from "react-native";

export const InterestsCard = () => {
  return (
    <View style={styles.container}>
      <Content>
        <InterestsHeader />
        <InterestsRow />
      </Content>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});
