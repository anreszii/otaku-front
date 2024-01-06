import {
  TouchableOpacityProps,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from "react-native";
import React, { FC } from "react";

interface IconButtonProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  style?: ViewStyle;
}

const IconButton: FC<IconButtonProps> = ({ icon, style, ...props }) => {
  return (
    <TouchableOpacity style={[style, styles.container]} {...props}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(114, 16, 255, 0.08)",
  },
});

export default IconButton;
