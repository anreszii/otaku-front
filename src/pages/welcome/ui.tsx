import { View, StyleSheet } from "react-native";
import { ImageBackground } from "expo-image";
import Overlay from "shared/ui/overlay";
import { WelcomeContent } from "features/welcome-content";
import { PosterBackground } from "features/poster-background";
import { WelcomeCard } from "widgets/welcome-card";

export const Welcome = () => {
  return (
    <PosterBackground>
      <WelcomeCard />
    </PosterBackground>
  );
};
