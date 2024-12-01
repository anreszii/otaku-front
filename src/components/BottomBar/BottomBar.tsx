import { View, Pressable, StyleSheet } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { bottomBarData } from "./data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

export const BottomBar = (props: BottomTabBarProps) => {
  const descriptors = Object.entries(props.descriptors) || [];
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={styles.tabBarContainer}>
      <View
        style={[styles.tabBar, { paddingBottom: bottom > 0 ? bottom : 25 }]}
      >
        {descriptors.map(([descriptorName, descriptor], index) => {
          const isFocused = descriptor.navigation.isFocused();

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
                  colors={["#1A80E5", "#00008B"]}
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
  },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: "space-between",
    backgroundColor: "#2E2F3A",
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
    bottom: 5,
  },
  tabTypography: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.5)",
  },
  tabTypographyFocused: {
    color: "#1A80E5",
  },
  tabTypographyHome: {
    marginTop: 27.5,
  },
});
