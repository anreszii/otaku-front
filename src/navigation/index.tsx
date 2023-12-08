import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Player from "../views/Player";
import Home from "../views/Home";
import Profile from "../views/Profile";
import Intro from "../views/Intro";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Welcome from "../views/Welcome";
import ForgotPassword from "../views/ForgotPassword";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="main">
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
    </Tab.Navigator>
  );
};

export const PublicStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Public"
      screenOptions={{ headerBackTitle: "" }}
    >
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      ></Stack.Screen>
      <Stack.Screen
        name="SignIn"
        options={{ headerShown: false }}
        component={SignIn}
      ></Stack.Screen>
      <Stack.Screen
        name="SignUp"
        options={{ headerShown: false }}
        component={SignUp}
      ></Stack.Screen>
      <Stack.Screen
        name="Forgot"
        options={{ headerShown: false }}
        component={ForgotPassword}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export const PrivateStackNavigator = ({ route }: any) => {
  return (
    <Stack.Navigator
      initialRouteName="Private"
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
