import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Player from "../views/Player";
import Home from "../views/Home";
import Profile from "../views/Profile";
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
import GlobalSearch from "../views/GlobalSearch";
import AnimePage from "../views/AnimePage";
import Notification from "../views/Notification";
import EditProfile from "../views/EditProfile";
import Security from "../views/Security";
import PrivacyPolicy from "../views/PrivacyPolicy";
import Premium from "../views/Premium";
import NotificationSettings from "../views/NotificationSettings";
import DownloadSettings from "../views/DownloadSettings";
import Language from "../views/Language";
import { useNetwork } from "../providers/NetworkContext";
import { t } from "i18next";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const TabNavigator = ({ route }: any) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingTop: 8,
          marginTop: -115,
        },
        headerShown: false,
      }}
      initialRouteName="main"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={route}
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
              type="bold"
              gradient={focused}
            >
              {t("bottomTabs.home")}
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
              type="bold"
              gradient={focused ? true : false}
            >
              {t("bottomTabs.releases")}
            </Typography>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="List"
        component={List}
        initialParams={route}
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
              type="bold"
              gradient={focused ? true : false}
            >
              {t("bottomTabs.myList")}
            </Typography>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Download"
        component={Download}
        initialParams={route}
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
              type="bold"
              gradient={focused ? true : false}
            >
              {t("bottomTabs.download")}
            </Typography>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={route}
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
              type="bold"
              gradient={focused ? true : false}
            >
              {t("bottomTabs.profile")}
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
      <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
      <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
      <Stack.Screen name="Forgot" component={ForgotPassword}></Stack.Screen>
    </Stack.Navigator>
  );
};

export const PrivateStackNavigator = ({ route }: any) => {
  const { networkType } = useNetwork();
  console.log(networkType);
  return (
    <Stack.Navigator
      initialRouteName="Private"
      screenOptions={{ headerShown: false }}
    >
      {networkType ? (
        <>
          <Stack.Screen name="Main" component={TabNavigator}></Stack.Screen>
          <Stack.Screen
            name="Player"
            initialParams={route}
            component={Player}
          ></Stack.Screen>
          <Stack.Screen
            name="Search"
            component={GlobalSearch}
            initialParams={route}
          ></Stack.Screen>
          <Stack.Screen
            name="AnimePage"
            initialParams={route}
            component={AnimePage}
          ></Stack.Screen>
          <Stack.Screen
            name="Notification"
            component={Notification}
          ></Stack.Screen>
          <Stack.Screen
            name="EditProfile"
            // @ts-ignore
            component={EditProfile}
            initialParams={route}
          ></Stack.Screen>
          <Stack.Screen
            name="NotificationSettings"
            component={NotificationSettings}
          ></Stack.Screen>
          <Stack.Screen
            name="DownloadSettings"
            component={DownloadSettings}
            initialParams={route}
          ></Stack.Screen>
          <Stack.Screen name="Security" component={Security}></Stack.Screen>
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
          ></Stack.Screen>
          <Stack.Screen name="Premium" component={Premium}></Stack.Screen>
          <Stack.Screen
            name="Language"
            component={Language}
            initialParams={route}
          ></Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="Download" component={Download}></Stack.Screen>
          <Stack.Screen name="Player" component={Player}></Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

export const NoInternetNavigator = ({ route }: any) => {
  return (
    <Stack.Navigator
      initialRouteName="NoInternet"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Download" component={Download}></Stack.Screen>
      <Stack.Screen name="Player" component={Player}></Stack.Screen>
    </Stack.Navigator>
  );
};
