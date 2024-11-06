import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { BackIcon } from "shared/icons";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";

interface BackButtonProps extends TouchableOpacityProps {}

const BackButton: React.FC<BackButtonProps> = ({ style, ...props }) => {
  const navigation = useTypedNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      onPress={handleBack}
      style={[styles.back, ...(Array.isArray(style) ? style : [style])]}
      {...props}
    >
      <BackIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: "#4169E1",
    borderRadius: 100,
    width: 32,
    height: 31,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BackButton;