import React, { useState } from "react";
import {
  Modal as NativeModal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

export function Modal({
  visible,
  setVisible,
  useDefaultStyles,
  children,
  full,
  ...props
}: any) {
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
