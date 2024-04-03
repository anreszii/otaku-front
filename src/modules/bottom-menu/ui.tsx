import { View, StyleSheet, Pressable } from "react-native";
import Typography from "src/ui/typography";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { bottomMenuData } from "./bottom-menu.data";
import { LinearGradient } from "expo-linear-gradient";

export const TabBar = (props: BottomTabBarProps) => {
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
              {descriptor.route.name === "Home" ? (
                <LinearGradient
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  colors={["#4169E1", "#00008B"]}
                  style={styles.tabIconHome}
                >
                  {bottomMenuData
                    .find((el) => el.path === descriptor.route.name)
                    ?.icon(isFocused)}
                </LinearGradient>
              ) : (
                <View>
                  {bottomMenuData
                    .find((el) => el.path === descriptor.route.name)
                    ?.icon(isFocused)}
                </View>
              )}

              <Typography
                variant="sub-bold"
                style={{
                  ...(descriptor.route.name === "Home"
                    ? styles.tabTypographyHome
                    : styles.tabTypography),
                  color: isFocused ? "#4169E1" : "rgba(255, 255, 255, 0.4)",
                }}
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
    paddingHorizontal: 8,
    paddingBottom: 20,
    width: "100%",
    bottom: 10,
  },
  tabBar: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "rgba(68, 68, 68, 0.6)",
    borderRadius: 16,
  },
  tab: {
    alignItems: "center",
  },
  tabIconHome: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    top: -25,
  },
  tabTypography: {
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
  tabTypographyHome: {
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 24,
  },
});
