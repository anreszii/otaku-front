import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { useTypedNavigation } from "shared/hooks/navigation";
import { Ionicons } from "@expo/vector-icons";

interface BackButtonProps extends TouchableOpacityProps {}

const BackButton: React.FC<BackButtonProps> = ({ style, ...props }) => {
  const navigation = useTypedNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleBack}
      style={[styles.back, ...(Array.isArray(style) ? style : [style])]}
      {...props}
    >
      <Ionicons name="chevron-back-outline" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  back: {
    borderRadius: 100,
    width: 32,
    height: 31,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default BackButton;
