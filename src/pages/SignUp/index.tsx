import React, { useState } from "react";
import { Layout } from "components";
import { Button, Field, Typography, BackButton, Loader, Modal } from "ui";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";
import useInterestsStore from "shared/stores/interestsStore";
import { IInterests } from "shared/types";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { authApi } from "shared/api";
import DeviceInfo from "react-native-device-info";
import { useAuthStore } from "shared/stores";

const SignUp = () => {
  const navigation = useTypedNavigation();

  const { interests } = useInterestsStore();
  const { register } = useAuthStore();

  const [step, setStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleNavigateSignIn = () => {
    navigation.navigate("SignIn");
  };

  const handleSelectInterest = (interest: IInterests) => {
    if (selectedInterests.includes(interest._id)) {
      setSelectedInterests((prev) => prev.filter((i) => i !== interest._id));
    } else {
      setSelectedInterests((prev) => [...prev, interest._id]);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    setError("");

    const deviceId = await DeviceInfo.getUniqueId();

    const error = await register(
      {
        username,
        email,
        password,
        deviceId,
      },
      selectedInterests,
      step
    );
    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }

    if (step === 0) {
      setStep((prev) => prev + 1);
    }
    setIsLoading(false);
  };

  return (
    <Layout scroll={step === 1}>
      {step === 0 && (
        <Animated.View exiting={SlideOutLeft.duration(300)}>
          <BackButton />
          <Typography style={styles.title} fontFamily="Montserrat">
            Создать аккаунт
          </Typography>
          <Field
            style={styles.field}
            placeholder="Имя пользователя"
            value={username}
            onChangeText={setUsername}
          />
          <Field
            style={styles.field}
            placeholder="Электронная почта"
            value={email}
            onChangeText={setEmail}
          />
          <Field
            style={styles.field}
            placeholder="Пароль"
            isPassword
            value={password}
            onChangeText={setPassword}
            errorText={error}
          />
          <View style={styles.signIn}>
            <Typography style={styles.signInText} fontFamily="Urbanist">
              Уже есть аккаунт?
            </Typography>
            <TouchableOpacity onPress={handleNavigateSignIn}>
              <Typography style={styles.signInButtonText} fontFamily="Urbanist">
                Войти
              </Typography>
            </TouchableOpacity>
          </View>
          <Button
            variant="contain"
            title="Создать аккаунт"
            style={styles.button}
            onPress={handleSignUp}
            isLoading={isLoading}
          />
        </Animated.View>
      )}
      {step === 1 && (
        <Animated.View
          style={styles.containerInterests}
          entering={SlideInRight.duration(300)}
        >
          <Typography fontFamily="Montserrat" style={styles.subtitle}>
            Выберите свои интересы и получите лучшие рекомендации по аниме
          </Typography>
          <View style={styles.interests}>
            {interests.map((interest) => (
              <TouchableOpacity
                key={interest._id}
                style={[
                  styles.interest,
                  selectedInterests.includes(interest._id) &&
                    styles.selectedInterest,
                ]}
                onPress={() => handleSelectInterest(interest)}
              >
                <Typography
                  fontFamily="Montserrat"
                  style={styles.interestTitle}
                >
                  {interest.ru}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            variant="contain"
            title="Продолжить"
            style={styles.button}
            onPress={handleSignUp}
            isLoading={isLoading}
          />
        </Animated.View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "500",
    marginTop: 25,
  },
  field: {
    marginTop: 25,
  },
  forgotPassword: {
    marginTop: 25,
  },
  forgotPasswordText: {
    color: "#4169E1",
    fontWeight: "500",
    fontSize: 16,
  },
  signIn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 25,
  },
  signInText: {
    fontWeight: "500",
    fontSize: 16,
  },
  signInButtonText: {
    color: "#4169E1",
    fontWeight: "500",
    fontSize: 16,
  },
  button: {
    marginTop: 25,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  containerInterests: {
    justifyContent: "space-between",
    height: "100%",
  },
  interests: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  interest: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#4169E1",
    marginTop: 15,
  },
  selectedInterest: {
    backgroundColor: "#4169E1",
  },
  interestTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 25,
  },
});

export default SignUp;
