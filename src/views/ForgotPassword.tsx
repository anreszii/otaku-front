import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
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
import Container from "../components/Layouts/Container";
import CodeInput from "../components/ui/CodeInput";
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import authService from "../api/auth/authService";
import TypographyError from "../components/ui/TypographyError";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
const { StatusBarManager } = NativeModules;

export default function SignUp() {
  const navigation = useNavigation<any>();
  const [stage, setStage] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [showPassword, setShowPassword] = useState<any>(false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState<any>("");
  const [value, setValue] = useState<string>("");
  const [newPassword, setNewPassword] = useState({
    onePass: "",
    twoPass: "",
  });
  const [error, setError] = useState<any>(null);
  const [code, setCode] = useState<any>("");

  const { t } = useTranslation();

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

  const sendEmailCode = () => {
    if (email.replaceAll(" ", "") !== "") {
      authService
        .forgotPassword(email)
        .then((data) => {
          console.log(data.data.code);
          setCode(data.data.code);
          setSeconds(59);
          setStage(2);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setError("Электронная почта не может быть пустой");
    }
  };

  const sendCode = () => {
    if (value === code) {
      setStage(3);
    }
  };

  const resetPassword = () => {
    if (newPassword.onePass === newPassword.twoPass) {
      authService
        .resetPassword(email, value, newPassword.onePass)
        .then((data) => {
          setVisible(true);
        });
    }
  };

  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#FFF" }}>
      <Container>
        {stage === 1 && (
          <>
            <HeaderBack
              title={t("headerTitles.forgotPassword")}
              style={{ marginLeft: 0 }}
            />
            <Image
              source={require("../../assets/icon.png")}
              style={{ width: 113, height: 67 }}
              contentFit="contain"
            />
            <Typography style={styles.title} type="title">
              {t("screens.resetPassword.title")}
            </Typography>
            <Input
              styleInput={{ marginTop: 13 }}
              label={t("inputs.labels.email")}
              left={
                <TextInput.Icon disabled icon={() => <Mail style={{}} />} />
              }
              value={email}
              onChangeText={(value: string) => {
                setEmail(value);
                setError(null);
              }}
            />

            <Button
              title={t("buttons.reset")}
              onPress={() => sendEmailCode()}
              style={styles.button}
            />
            {error && (
              <TypographyError error={error} style={{ marginTop: 13 }} />
            )}
          </>
        )}
        {stage === 2 && (
          <>
            <HeaderBackStage
              title={t("headerTitles.forgotPassword")}
              stage={stage}
              setStage={setStage}
            />
            <Typography type="regular" style={styles.titleTwo}>
              {t("screens.resetPassword.code")}{" "}
              {email.substr(0, 3) + "*****" + email.substr(-3)}
            </Typography>
            <CodeInput code={value} setCode={setValue} />
            <View style={styles.resendContainer}>
              {seconds > 0 ? (
                <Typography type="regular" style={styles.subtitleTwo}>
                  {t("screens.resetPassword.resendIn")}{" "}
                </Typography>
              ) : (
                <TouchableOpacity onPress={() => sendEmailCode()}>
                  <Typography
                    type="regular"
                    gradient={true}
                    style={styles.subtitleTwo}
                  >
                    {t("screens.resetPassword.resend")}
                  </Typography>
                </TouchableOpacity>
              )}

              <Typography
                type="regular"
                gradient={true}
                style={styles.subtitleTwo}
              >
                {seconds > 0 ? `${seconds}${" "}` : ""}
              </Typography>
              <Typography type="regular" style={styles.subtitleTwo}>
                {seconds > 0 ? `s` : ""}
              </Typography>
            </View>
            <Button
              title={t("buttons.verify")}
              onPress={() => sendCode()}
              style={styles.button}
            />
          </>
        )}
        {stage === 3 && (
          <>
            <Image
              source={require("../../assets/acceptPhone.png")}
              style={{ width: 414, height: "50%" }}
              contentFit="contain"
            />
            <Typography style={styles.titleThree} type="regular">
              {t("screens.resetPassword.reset")}
            </Typography>
            <Input
              styleInput={{ marginTop: 10 }}
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
              secureTextEntry={showPassword ? false : true}
              value={newPassword.onePass}
              onChangeText={(value: any) =>
                setNewPassword({ ...newPassword, onePass: value })
              }
            />
            <Input
              styleInput={{ marginTop: 10 }}
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
              secureTextEntry={showPassword ? false : true}
              value={newPassword.twoPass}
              onChangeText={(value: any) =>
                setNewPassword({ ...newPassword, twoPass: value })
              }
            />

            <Button
              title={t("buttons.сontinue")}
              onPress={() => resetPassword()}
              style={styles.button}
            />
          </>
        )}
        <CompleteModal
          visible={visible}
          setVisible={setVisible}
          redirect="SignIn"
        />
      </Container>
    </View>
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
