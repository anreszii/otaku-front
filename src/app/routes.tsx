import { FC } from "react";
import { useAuth } from "shared/providers/auth-provider";
import { NavigationContainer } from "@react-navigation/native";
import PublicNavigation from "src/app/navigation/PublicNavigation";
import PrivateNavigation from "src/app/navigation/PrivateNavigation";
import { DeepLinkProvider } from "shared/providers/deep-link-provider";

const Routing: FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <DeepLinkProvider>
        {user ? <PublicNavigation /> : <PrivateNavigation />}
      </DeepLinkProvider>
    </NavigationContainer>
  );
};

export default Routing;
