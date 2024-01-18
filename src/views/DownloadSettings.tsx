import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HeaderBack from "../components/Layouts/HeaderBack";
import { Trash, WiFi } from "../icons";
import Typography from "../components/ui/Typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import DeleteAllDownloads from "../components/Modals/DeleteAllDownloads";
import DeleteCache from "../components/Modals/DeleteCache";

export default function DownloadSettings({ route }: any) {
  const [wiFi, setWiFi] = useState(false);
  const [visibleAll, setVisibleAll] = useState(false);
  const [visibleCache, setVisibleCache] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const downloadWiFi = await AsyncStorage.getItem("downloadWiFi");
      setWiFi(downloadWiFi === "false" ? false : true);
    })();
  }, [route]);

  const handleWifi = async () => {
    await AsyncStorage.setItem("downloadWiFi", String(!wiFi));
    setWiFi(!wiFi);
  };

  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <HeaderBack title={t("headerTitles.download")} />
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.contentData}>
              <WiFi />
              <Typography style={styles.contentTitle} type="semibold">
                {t("screens.downloadSettings.labels.wifiOnly")}
              </Typography>
            </View>
            <Switch
              trackColor={{ false: "#EEEEEE", true: "#7210FF" }}
              ios_backgroundColor={"#EEEEEE"}
              value={wiFi}
              onValueChange={() => handleWifi()}
            />
          </View>
          <TouchableOpacity
            style={styles.content}
            onPress={() => setVisibleAll(true)}
          >
            <View style={styles.contentData}>
              <Trash />
              <Typography style={styles.contentTitle} type="semibold">
                {t("screens.downloadSettings.labels.deleteAll")}
              </Typography>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.content}
            onPress={() => setVisibleCache(true)}
          >
            <View style={styles.contentData}>
              <Trash />
              <Typography style={styles.contentTitle} type="semibold">
                {t("screens.downloadSettings.labels.deleteCache")}
              </Typography>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <DeleteAllDownloads visible={visibleAll} setVisible={setVisibleAll} />
      <DeleteCache visible={visibleCache} setVisible={setVisibleCache} />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    marginTop: 44,
    marginBottom: 72,
    marginHorizontal: 24,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
  },
  contentData: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 25.2,
    letterSpacing: 0.2,
    marginLeft: 20,
  },
});
