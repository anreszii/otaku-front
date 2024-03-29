import { FC } from "react";
import { useAuth } from "shared/providers/AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import PublicNavigation from "src/app/navigation/PublicNavigation";
import PrivateNavigation from "src/app/navigation/PrivateNavigation";

const Routing: FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <PublicNavigation /> : <PrivateNavigation />}
    </NavigationContainer>
  );
};

export default Routing;
