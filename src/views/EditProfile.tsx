import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { FC, useState } from "react";
import HeaderBack from "../components/Layouts/HeaderBack";
import { ChangeAvatar } from "../components/Profile/ChangeAvatar";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import userService from "../api/user/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CompleteBottomModal } from "../components/Modals/CompleteBottomModal";
import { EditPasswordModal } from "../components/Modals/EditPasswordModal";
import { useTranslation } from "react-i18next";

interface IFavoriteList {
  poster: string;
  rating: number;
  title: string;
}

interface IUser {
  id: string;
  avatar: string;
  email: string;
  favoriteList: IFavoriteList[];
  password: string;
  username: string;
}

interface EditProps {
  route: {
    params: {
      creature: IUser;
    };
  };
}

const EditProfile = ({ route }: EditProps) => {
  const [avatar, setAvatar] = useState<string | null>(
    route.params.creature.avatar
  );
  const [username, setUsername] = useState(route.params.creature.username);
  const [email, setEmail] = useState(route.params.creature.email);
  const [passwordC, setPasswordC] = useState({
    nowPass: "",
    onePass: "",
    twoPass: "",
  });
  const [errors, setErrors] = useState<any>([{}]);
  const [visible, setVisible] = useState(false);
  const [visiblePass, setVisiblePass] = useState(false);

  const { t } = useTranslation();

  const changeProfileData = async () => {
    const id = await AsyncStorage.getItem("id");
    const passwordNow = passwordC.nowPass;
    const password = passwordC.onePass;

    const commonData = {
      username,
      email,
    };

    try {
      if (
        passwordC.onePass === passwordC.twoPass &&
        passwordC.onePass.replaceAll(" ", "") !== "" &&
        passwordC.twoPass.replaceAll(" ", "") !== ""
      ) {
        await userService.checkPassword(String(id), passwordNow);

        const userData =
          avatar === null
            ? { password, ...commonData }
            : { password, avatar, ...commonData };

        await userService.userUpdate(String(id), userData);
        setVisible(true);
      } else {
        const userData =
          avatar === null ? commonData : { avatar, ...commonData };

        await userService.userUpdate(String(id), userData);
        setVisible(true);
      }
    } catch (e: any) {
      console.log(e.response.data);
      const errorList = e.response.data.errors || [{ param: "password" }];
      setErrors(errorList);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <HeaderBack title={t("headerTitles.editProfile")} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 62 }}
        >
          <View style={styles.content}>
            <ChangeAvatar avatar={avatar} setAvatar={setAvatar} />
            <Input
              styleInput={styles.input}
              label={t("screens.editProfile.labels.username")}
              value={username}
              onChangeText={(value: string) => {
                setUsername(value);
                setErrors(errors.filter((el: any) => el.param !== "username"));
              }}
              error={!!errors.find((el: any) => el.param === "username")}
              errorText={errors.find((el: any) => el.param === "username")?.msg}
            />
            <Input
              styleInput={styles.input}
              label={t("screens.editProfile.labels.email")}
              value={email}
              onChangeText={(value: string) => {
                setEmail(value);
                setErrors(errors.filter((el: any) => el.param !== "email"));
              }}
              error={!!errors.find((el: any) => el.param === "email")}
              errorText={errors.find((el: any) => el.param === "email")?.msg}
            />
            <Input
              styleInput={styles.input}
              label={t("screens.editProfile.labels.password.title")}
              value={passwordC.onePass}
              error={!!errors.find((el: any) => el.param === "password")}
              errorText={errors.find((el: any) => el.param === "password")?.msg}
              onPress={() => setVisiblePass(true)}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContent}>
            <Button title={t("buttons.update")} onPress={() => changeProfileData()} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <CompleteBottomModal visible={visible} setVisible={setVisible} />
      <EditPasswordModal
        visible={visiblePass}
        setVisible={setVisiblePass}
        password={passwordC}
        setPassword={setPasswordC}
        errors={errors}
        setErrors={setErrors}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    height: "100%",
  },
  content: {
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: "auto",
  },
  input: {
    marginTop: 24,
  },
  buttonContent: {
    marginRight: 24,
    marginLeft: 24,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto",
  },
  error: {
    marginTop: 24,
    alignItems: "center",
  },
});

export default EditProfile;
