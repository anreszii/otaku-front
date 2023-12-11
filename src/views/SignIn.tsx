import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  DevSettings,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/ui/Input";
import Typography from "../components/ui/Typography";
import { TextInput } from "react-native-paper";
import { EyeClose, EyeOpen, Lock, Mail } from "../icons";
import Button from "../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import Container from "../components/Layouts/Container";
import authService from "../api/auth/authService";
import TypographyError from "../components/ui/TypographyError";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState<any>(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<any>(null);
  const navigation = useNavigation<any>();

  const setToken = async () => {
    await authService
      .login(user.username, user.password)
      .then(async (data) => {
        await AsyncStorage.setItem("token", data.data.tokens.accessToken);
        DevSettings.reload();
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <Container>
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 113, height: 67 }}
        resizeMode="contain"
      />
      <Typography style={styles.title} type="title">
        Login to Your Account
      </Typography>
      <Input
        styleInput={{ marginTop: 13 }}
        label="Username"
        value={user.username}
        onChangeText={(value: string) => {
          setUser({ ...user, username: value });
          setError(null);
        }}
      />
      <Input
        styleInput={{ marginTop: 13 }}
        label="Password"
        left={<TextInput.Icon disabled icon={() => <Lock style={{}} />} />}
        right={
          <TextInput.Icon
            icon={() => (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOpen /> : <EyeClose />}
              </TouchableOpacity>
            )}
          />
        }
        secureTextEntry={showPassword ? false : true}
        value={user.password}
        onChangeText={(value: string) => {
          setUser({ ...user, password: value });
          setError(null);
        }}
      />
      <Button
        title="Sign In"
        style={styles.button}
        onPress={async () => await setToken()}
      />
      {error && <TypographyError error={error} style={{ marginTop: 15 }} />}
      <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
        <Typography type="button" gradient={true} style={styles.forgotPass}>
          Forgot the password?
        </Typography>
      </TouchableOpacity>
      <View style={styles.signContainer}>
        <Typography type="sub" style={styles.haveAcc}>
          Don’t have an account?
        </Typography>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Typography type="button" gradient={true} style={styles.signUp}>
            Sign Up
          </Typography>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 38.4,
    marginTop: 81,
  },
  button: {
    marginTop: 34,
  },
  forgotPass: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22.4,
    letterSpacing: 0.2,
    marginTop: 15,
  },
  haveAcc: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    opacity: 0.5,
    marginRight: 8,
  },
  signUp: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19.6,
    letterSpacing: 0.2,
  },
  signContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
