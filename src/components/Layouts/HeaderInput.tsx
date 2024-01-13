import React, { useState } from "react";
import {
  View,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Search } from "../../icons";
import Input from "../ui/Input";
import { TextInput } from "react-native-paper";
const { StatusBarManager } = NativeModules;

interface HeaderInputProps {
  style?: object;
  icon?: React.ReactNode;
  onPress?: () => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  opacity: any;
}

const HeaderInput: React.FC<HeaderInputProps> = ({
  style,
  icon,
  onPress,
  value,
  setValue,
  opacity,
}) => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(
    StatusBarManager.HEIGHT
  );

  return (
    <Animated.View
      style={{
        ...styles.container,
        ...{ top: statusBarHeight + 12 },
        ...style,
        opacity: opacity && opacity,
      }}
    >
      <Input
        left={<TextInput.Icon disabled icon={() => <Search color="#000" />} />}
        styleInput={styles.input}
        value={value}
        onChangeText={(value) => setValue(value)}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => onPress && onPress()}
      >
        {icon}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "87%",
    height: 48,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    marginLeft: 24,
    justifyContent: "space-between",
  },
  input: {
    width: "80%",
    marginRight: 12,
  },
  icon: {
    marginTop: 12,
  },
});

export default HeaderInput;
