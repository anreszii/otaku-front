import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";
import HeaderBack from "../components/Layouts/HeaderBack";
import Typography from "../components/ui/Typography";

export default function PrivacyPolicy() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderBack title="Privacy Policy" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Typography style={styles.contentTitle}>
            1. Types of Data We Collect
          </Typography>
          <Typography style={styles.contentSubtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </View>
        <View style={styles.content}>
          <Typography style={styles.contentTitle}>
            2. Use of Your Personal Data
          </Typography>
          <Typography style={styles.contentSubtitle}>
            Magna etiam tempor orci eu lobortis elementum nibh. Vulputate enim
            nulla aliquet porttitor lacus. Orci sagittis eu volutpat odio. Cras
            semper auctor neque vitae tempus quam pellentesque nec. Non quam
            lacus suspendisse faucibus interdum posuere lorem ipsum dolor.
            Commodo elit at imperdiet dui. Nisi vitae suscipit tellus mauris a
            diam. Erat pellentesque adipiscing commodo elit at imperdiet dui. Mi
            ipsum faucibus vitae aliquet nec ullamcorper. Pellentesque pulvinar
            pellentesque habitant morbi tristique senectus et.
          </Typography>
        </View>
        <View style={styles.contentLast}>
          <Typography style={styles.contentTitle}>
            3. Disclosure of Your Personal Data
          </Typography>
          <Typography style={styles.contentSubtitle}>
            Consequat id porta nibh venenatis cras sed. Ipsum nunc aliquet
            bibendum enim facilisis gravida neque. Nibh tellus molestie nunc non
            blandit massa. Quam pellentesque nec nam aliquam sem et tortor
            consequat id. Faucibus vitae aliquet nec ullamcorper sit amet risus.
            Nunc consequat interdum varius sit amet. Eget magna fermentum
            iaculis eu non diam phasellus vestibulum. Pulvinar pellentesque
            habitant morbi tristique senectus et. Lorem donec massa sapien
            faucibus et molestie. Massa tempor nec feugiat nisl pretium fusce
            id. Lacinia at quis risus sed vulputate odio. Integer vitae justo
            eget magna fermentum iaculis. Eget gravida cum sociis natoque
            penatibus et magnis.
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    marginTop: 48,
    marginHorizontal: 24,
  },
  content: {
    marginTop: 24,
  },
  contentLast: {
    marginTop: 24,
    marginBottom: 48,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  contentSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    marginTop: 24,
  },
});
