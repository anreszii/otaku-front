import { FC } from "react";
import { IButton } from "@/types/ui";
import { StyleSheet, TouchableOpacity } from "react-native";
import Typography from "./Typography";

const Button: FC<IButton> = ({ variant, title, ...props }) => {
  switch (variant) {
    case "contain":
      return (
        <TouchableOpacity style={styles.containButton} {...props}>
          <Typography style={styles.containTextButton}>{title}</Typography>
        </TouchableOpacity>
      );
    case "gradient":
      break;
  }
};

const styles = StyleSheet.create({
  containButton: {
    backgroundColor: "#4169E1",
    height: 52.5,
    width: "100%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  containTextButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Button;
