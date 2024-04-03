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
  close?: boolean;
}

export const Modal = ({
  visible,
  setVisible,
  useDefaultStyles,
  children,
  full,
  close,
  ...props
}: ModalProps) => {
  return (
    <NativeModal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setVisible && setVisible(!visible)}
      supportedOrientations={[
        "portrait",
        "portrait-upside-down",
        "landscape",
        "landscape-left",
        "landscape-right",
      ]}
      {...props}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={[
          full && { height: "100%", backgroundColor: "rgba(11, 18, 24, .8)" },
        ]}
        onPress={close ? () => setVisible && setVisible(!visible) : () => {}}
      >
        <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
      </TouchableOpacity>
    </NativeModal>
  );
};
