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
    <Tab.Navigator initialRouteName="main">
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
    </Tab.Navigator>
  );
};

export const StackNavigator = ({ route }: any) => {
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{ headerBackTitle: "" }}
    >
      <Stack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={TabNavigator}
      ></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen
        name="Player"
        initialParams={route}
        component={Player}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
