import React, { useRef, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import Typography from "../Typography";
import { Portal } from "@gorhom/portal";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  interpolate,
  runOnJS,
} from "react-native-reanimated";

interface SelectOption {
  label: string;
  value: string;
  color: string;
}

interface SelectProps {
  value: string | null;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export const Select = ({
  value,
  onChange,
  options,
  placeholder = "Выберите значение",
  style,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useSharedValue(0);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const selectRef = useRef<TouchableOpacity>(null);

  const selectedOption = options.find((option) => option.value === value);

  const handleClose = () => {
    animation.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setIsOpen)(false);
    });
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    handleClose();
  };

  const handleOpen = () => {
    if (selectRef.current) {
      selectRef.current.measureInWindow((x, y, width, height) => {
        const dropdownHeight = height * options.length + 16;
        const shouldShowBelow = y < dropdownHeight;

        setDropdownPosition({
          top: shouldShowBelow ? y + height + 8 : y - dropdownHeight + 8,
          left: x,
          width: width,
        });

        setIsOpen(true);
        animation.value = withTiming(1, { duration: 300 });
      });
    }
  };

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: animation.value,
  }));

  const dropdownStyle = useAnimatedStyle(() => ({
    opacity: animation.value,
    transform: [
      {
        translateY: interpolate(animation.value, [0, 1], [10, 0]),
      },
    ],
  }));

  return (
    <>
      <TouchableOpacity
        ref={selectRef}
        style={[styles.select, style]}
        onPress={handleOpen}
        activeOpacity={0}
      >
        <Typography
          style={[
            styles.selectText,
            { color: selectedOption?.color || "#fff" },
          ]}
        >
          {selectedOption?.label || placeholder}
        </Typography>
      </TouchableOpacity>

      {isOpen && (
        <Portal>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={handleClose}
            activeOpacity={1}
          >
            <Animated.View
              style={[StyleSheet.absoluteFill, styles.overlay, overlayStyle]}
            />
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.dropdown,
              {
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
              },
              dropdownStyle,
            ]}
          >
            {options.map((option) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={option.value}
                style={styles.option}
                onPress={() => handleSelect(option.value)}
              >
                <Typography
                  style={[styles.optionText, { color: option.color }]}
                >
                  {option.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  select: {
    backgroundColor: "#2E2F3A",
    borderRadius: 8,
    padding: 16,
    width: "100%",
  },
  selectText: {
    fontSize: 16,
    fontWeight: "500",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#2E2F3A",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  option: {
    padding: 12,
    borderRadius: 4,
    height: 48,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
