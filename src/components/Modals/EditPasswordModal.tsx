import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modal } from "../ui/Modal";
import CircleProgress from "../ui/CircleProgress";
import Typography from "../ui/Typography";
import Input from "../ui/Input";
import { TextInput } from "react-native-paper";
import { EyeClose, EyeOpen, Lock } from "../../icons";

export function EditPasswordModal({
  visible,
  setVisible,
  password,
  setPassword,
  errors,
  setErrors,
}: any) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      animationType="slide"
      full
      close={true}
    >
      <View style={styles.modal}>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <Input
              styleInput={styles.input}
              label="Current Password"
              value={password.nowPass}
              onChangeText={(value: string) => {
                setErrors(errors.filter((el: any) => el.param !== "password"));
                setPassword({ ...password, nowPass: value });
              }}
              left={
                <TextInput.Icon disabled icon={() => <Lock style={{}} />} />
              }
              right={
                <TextInput.Icon
                  icon={() => (
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOpen /> : <EyeClose />}
                    </TouchableOpacity>
                  )}
                />
              }
              secureTextEntry={!showPassword}
            />
            <Input
              styleInput={styles.input}
              label="New Password"
              value={password.onePass}
              onChangeText={(value: string) => {
                setErrors(errors.filter((el: any) => el.param !== "password"));
                setPassword({ ...password, onePass: value });
              }}
              left={
                <TextInput.Icon disabled icon={() => <Lock style={{}} />} />
              }
              right={
                <TextInput.Icon
                  icon={() => (
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOpen /> : <EyeClose />}
                    </TouchableOpacity>
                  )}
                />
              }
              secureTextEntry={!showPassword}
            />
            <Input
              styleInput={styles.inputLast}
              label="Repeat Password"
              value={password.twoPass}
              onChangeText={(value: string) => {
                setErrors(errors.filter((el: any) => el.param !== "password"));
                setPassword({ ...password, twoPass: value });
              }}
              left={
                <TextInput.Icon disabled icon={() => <Lock style={{}} />} />
              }
              right={
                <TextInput.Icon
                  icon={() => (
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOpen /> : <EyeClose />}
                    </TouchableOpacity>
                  )}
                />
              }
              secureTextEntry={!showPassword}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#FFF",
    marginTop: "auto",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingBottom: 40,
    borderColor: "#373D42",
    borderWidth: 1,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "80%",
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
    width: "80%",
  },
  input: {
    marginTop: 24,
  },
  inputLast: {
    marginTop: 24,
    marginBottom: 24,
  },
});
