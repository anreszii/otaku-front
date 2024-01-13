import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/ui/Input";
import Typography from "../components/ui/Typography";
import { TextInput } from "react-native-paper";
import { EyeClose, EyeOpen, Lock, Mail } from "../icons";
import Button from "../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import Bagde from "../components/ui/Bagde";
import data from "../data/interests.json";
import Container from "../components/Layouts/Container";
import HeaderBackStage from "../components/Layouts/HeaderBackStage";
import { ChangeAvatar } from "../components/Profile/ChangeAvatar";
import CompleteModal from "../components/Modals/CompleteModal";
import authService from "../api/auth/authService";
import TypographyError from "../components/ui/TypographyError";
import { Image } from "expo-image";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<any>(false);
  const [stage, setStage] = useState(1);
  const [badges, setBadges] = useState(data);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
  });
  const [interests, setInterests] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<any>(null);
  const navigation = useNavigation<any>();

  const handleGradient = (title: any) => {
    badges[badges.findIndex((el) => el.title === title)].focus =
      !badges[badges.findIndex((el) => el.title === title)].focus;
    setBadges([...badges]);
    const interestsTrue = badges.filter((el) => {
      return el.focus === true;
    });
    setInterests(interestsTrue);
  };

  const sendPreRegistration = () => {
    if (user.username.replaceAll(" ", "") !== "") {
      if (user.password.replaceAll(" ", "") !== "") {
        authService
          .checkUser(user.username)
          .then((data) => {
            setStage(stage + 1);
          })
          .catch((err) => {
            setError(err.response.data.message);
          });
      } else {
        setError("Пароль не может быть пустым");
      }
    } else {
      setError("Имя пользователя не может быть пустым");
    }
  };

  const sendRegistration = () => {
    authService
      .registration({ avatar, ...user, interests })
      .then(() => {
        setVisible(true);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#FFF" }}>
      <Container>
        {stage === 1 && (
          <>
            <Image
              source={require("../../assets/icon.png")}
              style={{ width: 113, height: 67 }}
              contentFit="contain"
            />
            <Typography style={styles.title} type="title">
              Create Your Account
            </Typography>
            <Input
              styleInput={{ marginTop: 13 }}
              label="Username"
              value={user.username}
              onChangeText={(value: any) => {
                setUser({ ...user, username: value });
                setError(null);
              }}
            />
            <Input
              styleInput={{ marginTop: 13 }}
              label="Password"
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
              value={user.password}
              onChangeText={(value: any) =>
                setUser({ ...user, password: value })
              }
            />
            <Button
              title="Sign Up"
              onPress={() => sendPreRegistration()}
              style={styles.button}
            />
            {error && (
              <TypographyError error={error} style={{ marginTop: 15 }} />
            )}
            <View style={styles.signContainer}>
              <Typography type="sub" style={styles.haveAcc}>
                Already have an account?
              </Typography>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Typography type="button" gradient={true} style={styles.signUp}>
                  Sign In
                </Typography>
              </TouchableOpacity>
            </View>
          </>
        )}
        {stage === 2 && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Typography type="sub" style={styles.titleTwo}>
              Choose your interests and get the best anime recommendations.
            </Typography>
            <View style={styles.badgesContainer}>
              {badges.map((item) => (
                <TouchableOpacity
                  key={item.title}
                  onPress={() => handleGradient(item.title)}
                  style={styles.badge}
                >
                  <Bagde title={item.title} gradient={item.focus} />
                </TouchableOpacity>
              ))}
            </View>
            <Button onPress={() => setStage(stage + 1)} title="Continue" />
          </ScrollView>
        )}
        {stage === 3 && (
          <>
            <HeaderBackStage
              title="Fill Your Profile"
              stage={stage}
              setStage={setStage}
            />
            <View style={{ width: "100%" }}>
              <View style={{ marginTop: 12 }}></View>
              <ChangeAvatar avatar={avatar} setAvatar={setAvatar} />
              <Input
                label="Email"
                styleInput={{ marginTop: 13 }}
                value={user.email}
                onChangeText={(value: any) => {
                  setUser({ ...user, email: value });
                  setError(null);
                }}
              />
              <Input
                label="Phone Number"
                keyboardType="phone-pad"
                styleInput={{ marginTop: 13 }}
                value={user.phoneNumber}
                onChangeText={(value: any) =>
                  setUser({ ...user, phoneNumber: value })
                }
              />
              <Button
                title="Continue"
                style={styles.button}
                onPress={() => sendRegistration()}
              />
              {error ? (
                <TypographyError style={{ marginTop: 13 }} error={error} />
              ) : (
                ""
              )}
            </View>
            <CompleteModal
              visible={visible}
              setVisible={setVisible}
              redirect="SignIn"
            />
          </>
        )}
      </Container>
    </View>
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
    marginTop: 15,
  },
  titleTwo: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 25.2,
    letterSpacing: 0.2,
    marginTop: 24,
  },
  badgesContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  badge: {
    marginTop: 24,
    marginRight: 12,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  number: {
    color: "#000",
  },
});
