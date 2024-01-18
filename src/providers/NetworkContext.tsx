import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

interface NetworkContextProps {
  children: ReactNode;
}

interface NetworkContextValue {
  networkType: string | boolean | null;
}

const NetworkContext = createContext<NetworkContextValue | undefined>(
  undefined
);

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
};

export const NetworkProvider: React.FC<NetworkContextProps> = ({
  children,
}) => {
  const [networkType, setNetworkType] = useState<string | boolean | null>(null);

  const handleNetworkChange = (state: NetInfoState) => {
    console.log(state.isConnected);
    if (state.isConnected) {
      setNetworkType(state.type);
    } else {
      setNetworkType(false);
    }
  };

  useEffect(() => {
    const fetchNetworkInfo = async () => {
      const networkState = await NetInfo.fetch();

      console.log(networkState.isConnected);

      handleNetworkChange(networkState);
    };

    const unsubscribe = NetInfo.addEventListener(handleNetworkChange);

    const checkConnectionOnReconnect = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        fetchNetworkInfo();
      } else {
        handleNetworkChange(state);
      }
    });

    return () => {
      unsubscribe();
      checkConnectionOnReconnect();
    };
  }, []);

  const contextValue: NetworkContextValue = {
    networkType,
  };

  return (
    <NetworkContext.Provider value={contextValue}>
      {children}
    </NetworkContext.Provider>
  );
};
