import { FC } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import PrivateNavigation from "./PrivateNavigation";
import PublicNavigation from "./PublicNavigation";

const Navigation: FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {!user ? <PublicNavigation /> : <PrivateNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
