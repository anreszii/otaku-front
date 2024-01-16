import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import userService from "../api/user/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ArrowRight,
  Download,
  Eye,
  HelpCenter,
  Language,
  LogOut,
  Notification,
  PrivacyPolicy,
  ProfileFull,
  Security,
} from "../icons";
import Typography from "../components/ui/Typography";
import PremiumBadge from "../components/Profile/PremiumBadge";
import { ChangeAvatar } from "../components/Profile/ChangeAvatar";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { LogOutModal } from "../components/Modals/LogOutModal";
import Header from "../components/Layouts/Header";
import CircleProgress from "../components/ui/CircleProgress";
import Loader from "../components/ui/Loader";
import { backgroundColors } from "../constants/colors";

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
  phoneNumber: string;
  username: string;
}

const Profile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [avatar, setAvatar] = useState<any>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lang, setLang] = useState<string | null>("");

  const navigation = useNavigation<any>();
  const route = useRoute();

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setIsLoading(true);
        const id: any = await AsyncStorage.getItem("id");
        const userData: IUser = (await userService.getUser(id)).data;
        setUser(userData);
        setAvatar(!!userData.avatar ? userData.avatar : null);
        const lang: any = await AsyncStorage.getItem("lang");
        setLang(lang?.charAt(0).toUpperCase() + lang?.slice(1));
        setIsLoading(false);
      })();
    }, [route])
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          <Header title="Profile" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.content}
          >
            <View style={styles.userContent}>
              <TouchableOpacity>
                <ChangeAvatar
                  avatar={avatar}
                  setAvatar={setAvatar}
                  widthAvatar={98}
                  heightAvatar={98}
                />
              </TouchableOpacity>
              <View style={styles.userDataContent}>
                <Typography style={styles.username} type="title">
                  {user?.username}
                </Typography>
                <Typography style={styles.email}>{user?.email}</Typography>
              </View>
            </View>
            <View style={styles.premiumContent}>
              <PremiumBadge />
            </View>
            <View style={styles.settingsContent}>
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={() =>
                  navigation.navigate("EditProfile", { creature: user })
                }
              >
                <View style={styles.settingsItemContent}>
                  <ProfileFull />
                  <Typography style={styles.settingsItemTitle}>
                    Edit Profile
                  </Typography>
                </View>
                <ArrowRight />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={() => navigation.navigate("NotificationSettings")}
              >
                <View style={styles.settingsItemContent}>
                  <Notification color="#000" width={18} />
                  <Typography style={styles.settingsItemTitle}>
                    Notification
                  </Typography>
                </View>
                <ArrowRight />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={() => navigation.navigate("DownloadSettings")}
              >
                <View style={styles.settingsItemContent}>
                  <Download style={{ marginBottom: 2 }} />
                  <Typography style={styles.settingsItemTitle}>
                    Download
                  </Typography>
                </View>
                <ArrowRight />
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.securityItem}
                onPress={() => navigation.navigate("Security")}
              >
                <View style={styles.settingsItemContent}>
                  <Security />
                  <Typography style={styles.settingsItemTitle}>
                    Security
                  </Typography>
                </View>
                <ArrowRight />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={() => navigation.navigate("Language")}
              >
                <View style={styles.settingsItemContent}>
                  <Language />
                  <Typography style={styles.settingsItemTitle}>
                    Language
                  </Typography>
                </View>
                <View style={styles.languageTitleContent}>
                  <Typography style={styles.languageTitle}>{lang}</Typography>
                  <ArrowRight />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingsItem}>
                <View style={styles.settingsItemContent}>
                  <Eye />
                  <Typography style={styles.settingsItemTitle}>
                    Dark Mode
                  </Typography>
                </View>
                <Switch
                  trackColor={{ false: "#EEEEEE", true: "#7210FF" }}
                  ios_backgroundColor={"#EEEEEE"}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={() => navigation.navigate("PrivacyPolicy")}
              >
                <View style={styles.settingsItemContent}>
                  <PrivacyPolicy />
                  <Typography style={styles.settingsItemTitle}>
                    Privacy Policy
                  </Typography>
                </View>
                <ArrowRight />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={() => setVisible(true)}
              >
                <View style={styles.settingsItemContent}>
                  <LogOut />
                  <Typography style={styles.logOutTitle}>Logout</Typography>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
      <LogOutModal visible={visible} setVisible={setVisible} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColors.backgroundLight,
  },
  content: {
    marginTop: 62,
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 80,
  },
  loader: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  userContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  userDataContent: {
    flexDirection: "column",
    marginLeft: 24,
  },
  username: {
    marginBottom: 8,
    fontSize: 20,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  premiumContent: {
    marginTop: 24,
  },
  settingsContent: {
    marginBottom: 24,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
  },
  settingsItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  securityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
  },
  settingsItemTitle: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.2,
    marginLeft: 20,
  },
  languageTitleContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageTitle: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.2,
    marginRight: 20,
  },
  logOutTitle: {
    color: "#F75555",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.2,
    marginLeft: 20,
  },
});

export default Profile;
