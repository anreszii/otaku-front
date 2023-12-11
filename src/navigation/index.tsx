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
import Releases from "../views/Releases";
import List from "../views/List";
import Download from "../views/Download";
import {
  DownloadIcon,
  HomeIcon,
  ListIcon,
  ProfileIcon,
  ReleaseIcon,
} from "../icons";
import Typography from "../components/ui/Typography";
import ListHitsAnime from "../views/ListHitsAnime";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { borderRadius: 25, marginTop: -100 },
        headerShown: false,
      }}
      initialRouteName="main"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return <HomeIcon focus={focused} />;
          },
          tabBarLabel: ({ focused }) => (
            <Typography
              style={{
                fontSize: 11,
                fontWeight: "700",
                color: "#9E9E9E",
                letterSpacing: 0.2,
              }}
              type="button"
              gradient={focused ? true : false}
            >
              Home
            </Typography>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Release"
        component={Releases}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return <ReleaseIcon focus={focused} />;
          },
          tabBarLabel: ({ focused }) => (
            <Typography
              style={{
                fontSize: 11,
                fontWeight: "700",
                color: "#9E9E9E",
                letterSpacing: 0.2,
              }}
              type="button"
              gradient={focused ? true : false}
            >
              Releases
            </Typography>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return <ListIcon focus={focused} />;
          },
          tabBarLabel: ({ focused }) => (
            <Typography
              style={{
                fontSize: 11,
                fontWeight: "700",
                color: "#9E9E9E",
                letterSpacing: 0.2,
              }}
              type="button"
              gradient={focused ? true : false}
            >
              My List
            </Typography>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Download"
        component={Download}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return <DownloadIcon focus={focused} />;
          },
          tabBarLabel: ({ focused }) => (
            <Typography
              style={{
                fontSize: 11,
                fontWeight: "700",
                color: "#9E9E9E",
                letterSpacing: 0.2,
              }}
              type="button"
              gradient={focused ? true : false}
            >
              Download
            </Typography>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return <ProfileIcon focus={focused} />;
          },
          tabBarLabel: ({ focused }) => (
            <Typography
              style={{
                fontSize: 11,
                fontWeight: "700",
                color: "#9E9E9E",
                letterSpacing: 0.2,
              }}
              type="button"
              gradient={focused ? true : false}
            >
              Profile
            </Typography>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export const PublicStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Public"
      screenOptions={{ headerShown: false }}
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
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={TabNavigator}
      ></Stack.Screen>
      <Stack.Screen
        name="Player"
        initialParams={route}
        component={Player}
      ></Stack.Screen>
      <Stack.Screen
        name="ListHist"
        initialParams={route}
        component={ListHitsAnime}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
