import React, { createContext, useContext, useState, useEffect } from "react";
import * as Linking from "expo-linking";
import { useTypedNavigation } from "shared/hooks/navigation";

interface DeepLinkContextType {
  initialLink: string | null;
  handleDeepLink: (url: string) => void;
}

const DeepLinkContext = createContext<DeepLinkContextType>({
  initialLink: null,
  handleDeepLink: () => {},
});

export const DeepLinkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigation = useTypedNavigation();
  const [initialLink, setInitialLink] = useState<string | null>(null);

  const handleDeepLink = (url: string) => {
    const { path, queryParams } = Linking.parse(url);

    switch (true) {
      case path?.startsWith("anime"):
        const title = String(queryParams?.title);
        navigation.navigate("Anime", { title });
        break;

      default:
        console.log("Unhandled deep link:", url);
    }
  };

  useEffect(() => {
    const getInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        setInitialLink(url);
        handleDeepLink(url);
      }
    };

    getInitialURL();

    const subscription = Linking.addEventListener("url", (event) => {
      setInitialLink(event.url);
      handleDeepLink(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <DeepLinkContext.Provider
      value={{
        initialLink,
        handleDeepLink,
      }}
    >
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
