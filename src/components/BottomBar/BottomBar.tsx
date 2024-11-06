import { View, Pressable, StyleSheet } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Typography } from "ui";
import { bottomBarData } from "./data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

export const BottomBar = (props: BottomTabBarProps) => {
  const descriptors = Object.entries(props.descriptors) || [];
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBarContainer,
        { marginBottom: bottom > 0 ? bottom : 25 },
      ]}
    >
      <View style={styles.tabBar}>
        {descriptors.map(([descriptorName, descriptor], index) => {
          const isFocused = descriptor.navigation.isFocused();
          const options = descriptor.options;

          return (
            <Pressable
              key={index}
              onPress={() =>
                descriptor.navigation.navigate(descriptor.route.name)
              }
              style={styles.tab}
            >
              {descriptor.route.name === "Home" ? (
                <LinearGradient
                  colors={["#4169E1", "#00008B"]}
                  style={styles.tabIconHome}
                >
                  {bottomBarData
                    .find((el) => el.path === descriptor.route.name)
                    ?.icon({ focus: isFocused })}
                </LinearGradient>
              ) : (
                <View style={styles.tabIcon}>
                  {bottomBarData
                    .find((el) => el.path === descriptor.route.name)
                    ?.icon({ focus: isFocused })}
                </View>
              )}
              <Typography
                style={[
                  styles.tabTypography,
                  isFocused && styles.tabTypographyFocused,
                  descriptor.route.name === "Home" && styles.tabTypographyHome,
                ]}
              >
                {options.title}
              </Typography>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: "space-between",
    backgroundColor: "#2E2F3A",
    marginHorizontal: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "rgba(204, 204, 204, 0.3)",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
  },
  tabIcon: {
    marginBottom: 5,
  },
  tabIconHome: {
    borderRadius: 100,
    padding: 12.5,
    position: "absolute",
    bottom: 20,
  },
  tabTypography: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.5)",
  },
  tabTypographyFocused: {
    color: "#4169E1",
  },
  tabTypographyHome: {
    marginTop: 27.5,
  },
});
