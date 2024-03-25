import { PropsWithChildren } from "react";
import { ButtonProps, TextProps, TouchableOpacityProps } from "react-native";

export interface ITypography extends TextProps {}

export interface IButton extends TouchableOpacityProps {
  variant: "contain" | "gradient";
  title: string;
}
