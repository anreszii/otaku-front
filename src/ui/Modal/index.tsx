import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ReactNativeModal, {
  ModalProps as ReactNativeModalProps,
} from "react-native-modal";

interface ModalProps extends Partial<ReactNativeModalProps> {
  isVisible: boolean;
  style?: StyleProp<ViewStyle>;
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  children,
  style,
  ...props
}) => {
  const opacity = useSharedValue(0);

  const animatedBlurStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withTiming(isVisible ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <Animated.View style={[StyleSheet.absoluteFill, animatedBlurStyle]} />
      )}
      <ReactNativeModal isVisible={isVisible} {...props}>
        <View
          style={[
            styles.container,
            ...(Array.isArray(style) ? style : [style]),
          ]}
        >
          {children}
        </View>
      </ReactNativeModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#2E2F3A",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 24,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "rgba(238, 238, 238, 0.1)",
  },
});

export default Modal;
