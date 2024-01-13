import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Typography from "../components/ui/Typography";
import Header from "../components/Layouts/Header";
import { Search, TrashGradient } from "../icons";
import { Image } from "expo-image";
import Loader from "../components/ui/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeleteDownloadModal } from "../components/Modals/DeleteDownloadModal";
import { useNavigation } from "@react-navigation/native";

interface DownloadsProps {
  displayTitle: string;
  episodeNumber: string;
  image: string;
  memory: number;
  title: string;
  video_url: string;
  voiceName: string;
}

interface DeleteProps {
  image: string;
  memory: number;
  title: string;
  voice: string;
  episode: string;
  video_url: string;
}

export default function Download({ route }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [downloads, setDownloads] = useState<DownloadsProps[]>([]);
  const [deleteItem, setDeleteItem] = useState<DeleteProps | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [flag, setFlag] = useState(false);

  const navigation = useNavigation<any>();

  useEffect(() => {
    (async () => {
      const data: any = await AsyncStorage.getItem("downloadsArray");
      setDownloads(JSON.parse(data));
      setIsLoading(false);
    })();
  }, [route, flag]);

  const handleDeleteItem = ({
    image,
    title,
    episode,
    voice,
    memory,
    video_url,
  }: DeleteProps) => {
    setDeleteItem({
      image: image,
      title: title,
      episode: episode,
      voice: voice,
      memory: memory,
      video_url: video_url,
    });
    setIsDelete(true);
  };

  const handlePlay = (title: string) => {
    navigation.navigate("Player", { creature: { title: title } });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          <Header title="Download" icon={<Search color="#000" />} />
          {!!downloads ? (
            <ScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {downloads.map((item) => (
                <TouchableOpacity
                  key={item.video_url}
                  style={styles.downloadItem}
                  onPress={() => handlePlay(item.title)}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.downloadImage}
                  />
                  <View style={styles.downloadContent}>
                    <Typography style={styles.downloadTitle} type="title">
                      {item.displayTitle.substring(0, 25) +
                        (item.displayTitle.length <= 25 ? "" : "...")}
                    </Typography>
                    <View style={styles.downloadDataContent}>
                      <Typography
                        style={styles.episodeTitle}
                      >{`Episode ${item.episodeNumber}`}</Typography>
                      <View style={styles.voiceContent}>
                        <Typography style={styles.voiceTitle} gradient={true}>
                          {item.voiceName}
                        </Typography>
                      </View>
                    </View>
                    <View style={styles.bottomContent}>
                      <View style={styles.memoryContent}>
                        <Typography
                          style={styles.memoryTitle}
                          gradient={true}
                        >{`${item.memory} MB`}</Typography>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          handleDeleteItem({
                            image: item.image,
                            title: item.displayTitle,
                            episode: item.episodeNumber,
                            voice: item.voiceName,
                            memory: item.memory,
                            video_url: item.video_url,
                          })
                        }
                      >
                        <TrashGradient />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.imageContent}>
              <Image
                source={require("../../assets/downlNone.png")}
                style={styles.noneImage}
              />
              <View style={styles.noneTextContent}>
                <Typography
                  gradient={true}
                  type="title"
                  style={styles.noneTitle}
                >
                  Your Download is Empty
                </Typography>
                <Typography style={styles.noneSubtitle}>
                  Looks like you haven't downloaded anime at all
                </Typography>
              </View>
            </View>
          )}
        </SafeAreaView>
      )}
      <DeleteDownloadModal
        visible={isDelete}
        setVisible={setIsDelete}
        deleteItem={deleteItem}
        flag={flag}
        setFlag={setFlag}
        setLoading={setIsLoading}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  imageContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  noneImage: {
    width: "80%",
    height: 380,
  },
  noneTextContent: {
    width: "80%",
  },
  noneTitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  noneSubtitle: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.2,
    textAlign: "center",
    marginTop: 16,
  },
  content: {
    marginTop: 48,
    marginBottom: 96,
    marginHorizontal: 24,
  },
  downloadItem: {
    flexDirection: "row",
    marginTop: 24,
  },
  deleteItem: {
    flexDirection: "row",
  },
  downloadContent: {
    width: "55%",
    justifyContent: "space-between",
  },
  downloadDataContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  downloadImage: {
    width: "40%",
    height: 113,
    borderRadius: 10,
    marginRight: 20,
  },
  downloadTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  episodeTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginRight: 12,
    letterSpacing: 0.2,
  },
  voiceTitle: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
    padding: 4,
  },
  voiceContent: {
    backgroundColor: "rgba(114, 16, 255, 0.08)",
    borderRadius: 10,
  },
  memoryTitle: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 10,
  },
  memoryContent: {
    width: "50%",
    borderRadius: 10,
    backgroundColor: "rgba(114, 16, 255, 0.08)",
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    alignItems: "center",
  },
});
