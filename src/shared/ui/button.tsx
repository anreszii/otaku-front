import { FC } from "react";
import { IButton } from "shared/types/ui";
import { StyleSheet, TouchableOpacity } from "react-native";
import Typography from "./typography";
import { LinearGradient } from "expo-linear-gradient";

const Button: FC<IButton> = ({ variant, title, style, ...props }) => {
  switch (variant) {
    case "contain":
      return (
        <TouchableOpacity style={[styles.containButton, style]} {...props}>
          <Typography style={styles.containTextButton} variant="sub-bold">
            {title}
          </Typography>
        </TouchableOpacity>
      );
    case "gradient":
      return (
        <TouchableOpacity
          style={[styles.gradientButtonContainer, style]}
          {...props}
        >
          <LinearGradient
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={["rgba(0, 0, 139, 1)", "#0B1218"]}
            style={styles.gradientButton}
          >
            <Typography style={styles.gradientTextButton} variant="sub-bold">
              {title}
            </Typography>
          </LinearGradient>
        </TouchableOpacity>
      );
      break;
  }
};

const styles = StyleSheet.create({
  containButton: {
    backgroundColor: "#4169E1",
    height: 52.5,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  containTextButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  gradientButtonContainer: {
    width: "100%",
    height: 52.5,
  },
  gradientButton: {
    height: 52.5,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#4169E1",
  },
  gradientTextButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Button;
