import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";

interface LayoutProps {
  scroll?: boolean;
  noMargin?: boolean;
  noSafe?: boolean;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
  scroll = false,
  noMargin = false,
  noSafe = false,
}) => {
  const Container = noSafe ? View : SafeAreaView;
  const containerStyle = [
    styles.container,
    noMargin && { marginHorizontal: 0 },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.wrapper}>
        <Container style={containerStyle}>
          {scroll ? (
            <ScrollView
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            children
          )}
        </Container>
      </View>
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
