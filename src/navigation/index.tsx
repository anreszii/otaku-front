import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Player from "../views/Player";
import Home from "../views/Home";
import Profile from "../views/Profile";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Player" component={Player}></Tab.Screen>
    </Tab.Navigator>
  );
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: "" }}>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={TabNavigator}
      ></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
    </Stack.Navigator>
  );
};
