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
import React, { useEffect } from "react";
import Animated, { AnimatedProps } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface LayoutProps extends Partial<AnimatedProps<View>> {
  scroll?: boolean;
  noMargin?: boolean;
  noSafe?: boolean;
  style?: StyleProp<ViewStyle>;
  scrollRef?: React.RefObject<ScrollView>;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
  scroll = false,
  noMargin = false,
  noSafe = false,
  style,
  scrollRef,
  ...props
}) => {
  const Container = noSafe ? View : SafeAreaView;
  const containerStyle = [
    styles.container,
    ...(Array.isArray(style) ? style : [style]),
    noMargin && { marginHorizontal: 0, marginVertical: 0 },
  ];

  useEffect(() => {
    return () => {
      if (scrollRef?.current) {
        scrollRef.current.scrollTo({ x: 0, y: 0, animated: false });
      }
    };
  }, []);

  const { bottom } = useSafeAreaInsets();

  return (
    <Animated.View style={styles.wrapper} {...props}>
      <Container style={containerStyle}>
        {scroll ? (
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={[
              styles.content,
              { paddingBottom: Math.max(bottom + 65, 90) },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={{ flex: 1 }}>{children}</View>
            </TouchableWithoutFeedback>
          </ScrollView>
        ) : (
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={{ flex: 1 }}>{children}</View>
          </TouchableWithoutFeedback>
        )}
      </Container>
    </Animated.View>
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
