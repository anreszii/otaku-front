import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Field } from "ui/field";
import Typography from "ui/typography";
import { TextInput } from "react-native-paper";
import { EyeIcon } from "src/lib/icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "src/lib/routes";

type InterestsType = {
  title: string;
  focus: boolean;
};

export const SignUpRow = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [interests, setInterests] = useState<InterestsType[]>([]);
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState<string>("");

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Field
        placeholder="Имя пользователя"
        styleInput={styles.input}
        value={username}
        textContentType="username"
        onChangeText={(value) => setUsername(value)}
      />
      <Field
        placeholder="Пароль"
        secureTextEntry={!showPassword}
        value={password}
        textContentType="password"
        onChangeText={(value) => setPassword(value)}
        right={
          <TextInput.Icon
            icon={() => (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <EyeIcon close={!showPassword} />
              </TouchableOpacity>
            )}
          />
        }
      />
      <View style={styles.row}>
        <Typography style={styles.haveAcc} variant="sub-medium">
          Уже есть аккаунт?{" "}
        </Typography>
        <TouchableOpacity onPress={() => navigate("SignIn")}>
          <Typography style={styles.signIn} variant="sub-semi-bold">
            Войти
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
  },
  input: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    flexWrap: "wrap",
  },
  haveAcc: {
    fontSize: 16,
    letterSpacing: 0.2,
    textAlign: "center",
    color: "#fff",
  },
  signIn: {
    fontSize: 16,
    letterSpacing: 0.2,
    fontWeight: "500",
    textAlign: "center",
    color: "#4169E1",
  },
});
