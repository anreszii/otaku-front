import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar } from "widgets/bottom-menu";
import { Home } from "pages/home";
import { Chat } from "pages/chat";
import { Rooms } from "pages/rooms";
import { Profile } from "pages/profile";
import { Calendar } from "pages/calendar";

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
