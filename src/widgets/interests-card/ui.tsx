import { StyleSheet, View } from "react-native";
import { Content } from "shared/index";
import { InterestsHeader, InterestsRow } from "features/sign-up-content";

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
