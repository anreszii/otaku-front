import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import Animated, { AnimatedProps } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface LayoutProps extends Partial<AnimatedProps<View>> {
  scroll?: boolean;
  noMargin?: boolean;
  noSafe?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
  scroll = false,
  noMargin = false,
  noSafe = false,
  style,
  ...props
}) => {
  const Container = noSafe ? View : SafeAreaView;
  const containerStyle = [
    styles.container,
    ...(Array.isArray(style) ? style : [style]),
    noMargin && { marginHorizontal: 0, marginVertical: 0 },
  ];

  const { bottom } = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Animated.View style={styles.wrapper} {...props}>
        <Container style={containerStyle}>
          {scroll ? (
            <ScrollView
              contentContainerStyle={[
                styles.content,
                { paddingBottom: (bottom > 0 ? bottom : 25) + 100 },
              ]}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            children
          )}
        </Container>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#0B1218",
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 25,
  },
  content: {
    flexGrow: 1,
  },
});

export default Layout;
