import {
  StyleProp,
  TextProps,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { TextInputProps } from "react-native-paper";

export interface ITypography extends TextProps {
  variant:
    | "sub-regular"
    | "sub-medium"
    | "sub-semi-bold"
    | "sub-bold"
    | "title-regular"
    | "title-medium"
    | "title-semi-bold"
    | "title-bold"
    | "error";
}

export interface IButton extends TouchableOpacityProps {
  variant: "contain" | "gradient";
  title: string;
}

export interface IField extends TextInputProps {
  styleInput?: StyleProp<ViewStyle>;
  onPress?: () => void;
  error?: boolean;
  errorText?: string;
}
