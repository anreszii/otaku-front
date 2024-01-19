import React, { createContext, useContext, useEffect } from "react";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation<any>();

  const handleDeepLink = async (event: { url: string }) => {
    const { url } = event;
    if (url.slice(8, 17) === "AnimePage") {
      const Buffer = require("buffer").Buffer;
      const decodedAuth = Buffer.from(
        decodeURIComponent(url.slice(url.indexOf("=") + 1)).replaceAll(
          " ",
          "+"
        ),
        "base64"
      ).toString("utf8");
      navigation.navigate("AnimePage", {
        title: decodedAuth,
      });
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
