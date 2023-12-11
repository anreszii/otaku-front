import React from "react";
import {
  Modal as NativeModal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ModalProps as NativeModalProps,
  StyleProp,
  ViewStyle,
} from "react-native";

interface ModalProps extends NativeModalProps {
  visible: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  useDefaultStyles?: boolean;
  children: React.ReactNode;
  full?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Modal({
  visible,
  setVisible,
  useDefaultStyles,
  children,
  full,
  ...props
}: ModalProps) {
  return (
    <NativeModal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setVisible && setVisible(!visible)}
      {...props}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={[
          full && { height: "100%", backgroundColor: "rgba(11, 18, 24, .8)" },
        ]}
      >
        <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
      </TouchableOpacity>
    </NativeModal>
  );
}
