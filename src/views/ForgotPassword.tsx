import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../components/ui/Input";
import Typography from "../components/ui/Typography";
import { TextInput } from "react-native-paper";
import { EyeClose, EyeOpen, Lock, Mail } from "../icons";
import Button from "../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import CompleteModal from "../components/Modals/CompleteModal";
import HeaderBack from "../components/Layouts/HeaderBack";
import HeaderBackStage from "../components/Layouts/HeaderBackStage";

export default function SignUp() {
  const navigation = useNavigation<any>();
  const [stage, setStage] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [showPassword, setShowPassword] = useState<any>(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setSeconds(59);
  }, [stage]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (stage === 2) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, stage]);

  return (
    <SafeAreaView style={styles.container}>
      {stage === 1 && (
        <>
          <HeaderBack title="Forgot Password" />
          <Image
            source={require("../../assets/icon.png")}
            style={{ width: 113, height: 67 }}
            resizeMode="contain"
          />
          <Typography style={styles.title} type="title">
            Reset Your Password
          </Typography>
          <Input
            styleInput={{ marginTop: 13 }}
            label="Mail"
            left={<TextInput.Icon disabled icon={() => <Mail style={{}} />} />}
          />

          <Button
            title="Reset Password"
            onPress={() => setStage(2)}
            style={styles.button}
          />
        </>
      )}
      {stage === 2 && (
        <>
          <HeaderBackStage
            title="Forgot Password"
            stage={stage}
            setStage={setStage}
          />
          <Typography type="sub" style={styles.titleTwo}>
            Code has been send to ma******.com
          </Typography>
          <View style={styles.resendContainer}>
            {seconds > 0 ? (
              <Typography type="sub" style={styles.subtitleTwo}>
                Resend code in{" "}
              </Typography>
            ) : (
              <TouchableOpacity onPress={() => setSeconds(59)}>
                <Typography
                  type="sub"
                  gradient={true}
                  style={styles.subtitleTwo}
                >
                  Resend code
                </Typography>
              </TouchableOpacity>
            )}

            <Typography type="sub" gradient={true} style={styles.subtitleTwo}>
              {seconds > 0 ? `${seconds}${" "}` : ""}
            </Typography>
            <Typography type="sub" style={styles.subtitleTwo}>
              {seconds > 0 ? `s` : ""}
            </Typography>
          </View>
          <Button
            title="Verify"
            onPress={() => setStage(3)}
            style={styles.button}
          />
        </>
      )}
      {stage === 3 && (
        <>
          <HeaderBackStage
            title="Create New Password"
            stage={stage}
            setStage={setStage}
          />
          <Image
            source={require("../../assets/acceptPhone.png")}
            style={{ width: 313, height: 313 }}
            resizeMode="contain"
          />
          <Typography style={styles.titleThree} type="sub">
            Reset Your Password
          </Typography>
          <Input
            styleInput={{ marginTop: 10 }}
            left={<TextInput.Icon disabled icon={() => <Lock style={{}} />} />}
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
            secureTextEntry={showPassword ? false : true}
          />
          <Input
            styleInput={{ marginTop: 10 }}
            left={<TextInput.Icon disabled icon={() => <Lock style={{}} />} />}
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
            secureTextEntry={showPassword ? false : true}
          />

          <Button
            title="Continue"
            onPress={() => setVisible(true)}
            style={styles.button}
          />
        </>
      )}
      <CompleteModal
        visible={visible}
        setVisible={setVisible}
        redirect="SignIn"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 38.4,
    marginTop: 81,
  },
  button: {
    marginTop: 34,
  },
  titleTwo: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 25.2,
    letterSpacing: 0.2,
  },
  subtitleTwo: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 25.2,
    letterSpacing: 0.2,
  },
  resendContainer: {
    display: "flex",
    flexDirection: "row",
  },
  titleThree: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 25.2,
    letterSpacing: 0.2,
    marginTop: 24,
    textAlign: "left",
    width: "80%",
  },
});
