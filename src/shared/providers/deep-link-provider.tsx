import React, { createContext, useContext, useEffect } from "react";
import * as Linking from "expo-linking";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "shared/routes";

interface DeepLinkContextType {
  handleDeepLink: (event: { url: string }) => void;
}

interface IDeepLinkProvider {
  children: React.ReactNode;
}

const DeepLinkContext = createContext<DeepLinkContextType | undefined>(
  undefined
);

export const DeepLinkProvider: React.FC<IDeepLinkProvider> = ({ children }) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const handleDeepLink = async (event: { url: string }) => {
    const { url } = event;
    if (url) {
      navigate("Forgot");
    }
  };

  useEffect(() => {
    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  const contextValue: DeepLinkContextType = {
    handleDeepLink,
  };

  return (
    <DeepLinkContext.Provider value={contextValue}>
      {children}
    </DeepLinkContext.Provider>
  );
};

export const useDeepLink = () => {
  const context = useContext(DeepLinkContext);
  if (!context) {
    throw new Error("useDeepLink must be used within a DeepLinkProvider");
  }
  return context;
};
