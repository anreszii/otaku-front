import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Typography } from "ui";
import { bottomBarData } from "./data";

export const BottomBar = (props: BottomTabBarProps) => {
  const descriptors = Object.entries(props.descriptors) || [];

  return (
    <View style={styles.tabBarContainer}>
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
              <View>
                {bottomBarData
                  .find((el) => el.path === descriptor.route.name)
                  ?.icon({ focus: isFocused })}
              </View>
              <Typography style={styles.tabTypography}>
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
  },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10,
    justifyContent: "space-between",
    backgroundColor: "#2A2A32",
  },
  tab: {
    alignItems: "center",
  },
  tabTypography: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "400",
  },
});
