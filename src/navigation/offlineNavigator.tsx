import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { createStackNavigator } from "@react-navigation/stack";
import Download from "../views/Download";
import Player from "../views/Player";
import Typography from "../components/ui/Typography";

const Stack = createStackNavigator();

export const createOfflineNavigator = (OnlineNavigator: any) => {
  return ({ route }: any) => {
    const [isOnline, setIsOnline] = useState<any>(true);

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsOnline(state.isConnected);
      });

      return () => {
        unsubscribe();
      };
    }, []);

    useEffect(() => {
      NetInfo.fetch()
        .then((state) => {
          setIsOnline(state.isConnected);
        })
        .catch(() => {
          setIsOnline(false);
        });

      const handleConnectivityChange = (state: any) => {
        setIsOnline(state.isConnected);
      };

      const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

      return () => {
        unsubscribe();
      };
    }, []);

    if (isOnline) {
      return <OnlineNavigator route={route} />;
    } else {
      return (
        <>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Download"
              component={Download}
              initialParams={route}
            />
            <Stack.Screen
              name="Player"
              component={Player}
              initialParams={route}
            />
          </Stack.Navigator>
        </>
      );
    }
  };
};
