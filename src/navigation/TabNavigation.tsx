import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Typography from "@/components/ui/Typography";
import TabBar from "@/components/layout/BottomMenu/BottomMenu";
import Home from "@/views/Home";
import Calendar from "@/views/Calendar";
import Chat from "@/views/Chat";
import Rooms from "@/views/Rooms";
import Profile from "@/views/Profile";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{ title: "Календарь" }}
      ></Tab.Screen>
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{ title: "Чат" }}
      ></Tab.Screen>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: "Главная" }}
      ></Tab.Screen>
      <Tab.Screen
        name="Rooms"
        component={Rooms}
        options={{ title: "Комнаты" }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Профиль" }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigation;
