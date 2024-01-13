import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ChoiceVoiceModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  data: any[];
  setVisibleEpisode: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChoiceVoiceModal({
  visible,
  setVisible,
  data,
  setVisibleEpisode,
  value,
  setValue,
}: ChoiceVoiceModalProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      animationType="fade"
      full
      close={true}
    >
      <View style={styles.container}>
        <Typography type="title" gradient={true} style={styles.title}>
          Choice
        </Typography>
        <Typography style={styles.subtitle}>
          Select Voice to download
        </Typography>
        <View style={{ width: "100%", marginBottom: 24 }}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "#7210FF" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            showsVerticalScrollIndicator={false}
            placeholder={!isFocus ? "Select Voice" : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={{ width: 200, height: 60 }}>
          <Button
            title="Продолжить"
            gradient={false}
            onPress={() => {
              setVisible(false);
              setVisibleEpisode(true);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "#FFF",
    paddingTop: 40,
    paddingBottom: 32,
    paddingLeft: 32,
    paddingRight: 32,
    alignSelf: "center",
    justifySelf: "center",
    borderColor: "#373D42",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22.4,
    letterSpacing: 0.2,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
