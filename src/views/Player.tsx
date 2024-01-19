import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import Video from "react-native-video";
import * as ScreenOrientation from "expo-screen-orientation";
import Controls from "../components/Player/Controls";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { searchAnimeWithEpisodes } from "../api/kodik/searchAnimeWithEpisodes";
import { getAnimeUrl } from "../api/kodik/getAnimeUrl";
import CircleProgress from "../components/ui/CircleProgress";
import RightModal from "../components/Modals/RightModal";
import Typography from "../components/ui/Typography";
import { Back } from "../icons";
import { getAllVoiceAnime } from "../api/kodik/getAllVoiceAnime";
import { searchAnimeWithVoice } from "../api/kodik/searchAnimeWithVoice";
import { ProgressBar } from "react-native-paper";
import { t } from "i18next";

export default function Player({ route }: any) {
  const video = useRef<any>(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [full, setFull] = useState(false);
  const [timeoutID, setTimeoutID] = useState<any>(null);
  const [visible, setVisible] = useState(true);
  const [visibleRightSpeed, setVisibleRightSpeed] = useState(false);
  const [visibleRightVoice, setVisibleRightVoice] = useState(false);
  const [visibleRightEpisode, setVisibleRightEpisode] = useState(false);
  const [visibleRightQuality, setVisibleRightQuality] = useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [showSkipText, setShowSkipText] = useState(false);
  const [skipTextSide, setSkipTextSide] = useState<"left" | "right" | null>(
    null
  );
  const [videoLink, setVideoLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState("720");
  const [episode, setEpisode] = useState<any>([]);
  const [voice, setVoice] = useState<any>([]);
  const skipTextOpacity = useRef(new Animated.Value(0)).current;
  const backgroundColor = useRef(new Animated.Value(0)).current;

  const showSkipAnimation = (side: "left" | "right") => {
    setShowSkipText(true);
    setSkipTextSide(side);
    Animated.timing(skipTextOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(skipTextOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowSkipText(false);
        setSkipTextSide(null);
      });
    });
  };

  const changeOrientation = (e: ScreenOrientation.OrientationChangeEvent) => {
    if (e.orientationInfo.orientation > 1) {
      setFull(true);
    } else {
      setFull(false);
    }
  };

  const skipBack = () => {
    try {
      const newPosition = Math.max((position * 60 - 10) / 60, 0);
      video.current.seek(newPosition * 60);
      setPosition(newPosition);
    } catch (error) {
      console.error("Error during skipBack:", error);
    }
  };

  const skipForward = () => {
    try {
      const newPosition = Math.min((position * 60 + 10) / 60, duration);
      video.current.seek(newPosition * 60);
      setPosition(newPosition);
    } catch (error) {
      console.error("Error during skipForward:", error);
    }
  };

  const handlePlaybackStatusUpdate = (status: any) => {
    setPosition(status.currentTime / 60);
  };

  const handleSliderChange = (value: any) => {
    if (video.current) {
      if (timeoutID !== null) {
        clearTimeout(timeoutID);
      }

      const timeout = setTimeout(() => {
        if (video.current) {
          video.current.seek(value * 60);
          setPosition(value);
        }
      });

      setTimeoutID(timeout);
    }
  };

  const handlePress = () => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(backgroundColor, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleLoad = (meta: any) => {
    setDuration(meta.duration / 60);
    setIsLoading(false);
  };

  const singleTap = Gesture.Tap().onStart((event) => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setVisible(!visible));
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setVisible(!visible));
    }
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((event, success) => {
      setVisible(false);
      handlePress();
      const touchX = event.absoluteX;

      let mid = Dimensions.get("screen").width / 2;

      if (touchX < mid) {
        skipBack();
        showSkipAnimation("left");
      } else {
        skipForward();
        showSkipAnimation("right");
      }
    });

  const handleChangeVoice = async (title: string) => {
    voice[voice.findIndex((el: any) => el.focus === true)].focus = false;
    voice[voice.findIndex((el: any) => el.title === title)].focus = true;
    setVoice([...voice]);
    await getEpisodeWithVoiceWithoutChangeEpisodeFocus(title);
  };

  const handleChangeEpisode = async (value: number) => {
    episode[episode.findIndex((el: any) => el.focus === true)].focus = false;
    episode[episode.findIndex((el: any) => el.value === value)].focus = true;
    setEpisode([...episode]);
    await getVideoLink(quality, [...episode], voice);
  };

  const getEpisodeWithVoiceWithoutChangeEpisodeFocus = async (
    voice: string
  ) => {
    const title = route.params.creature.title;
    const data = await searchAnimeWithVoice(title, voice);
    const episodeFocus =
      episode.findIndex((el: any) => el.focus === true) !== -1
        ? episode.findIndex((el: any) => el.focus === true)
        : 0;
    const tempEpisodeArray: any[] = [];
    Array.from(
      data.type === "anime"
        ? { length: 1 }
        : {
            length: Object.values<any>(
              Object.values<any>(data.seasons)[0].episodes
            ).length,
          }
    ).map((item, index) => {
      tempEpisodeArray.push({
        title: `Episode ${index + 1}`,
        value: index + 1,
        focus: index === episodeFocus ? true : false,
      });
    });
    setEpisode(tempEpisodeArray);
  };

  const getEpisodeWithVoice = async (voice: string) => {
    const title = route.params.creature.title;
    const data = await searchAnimeWithVoice(title, voice);
    const tempEpisodeArray: any[] = [];
    Array.from(
      data.type === "anime"
        ? { length: 1 }
        : {
            length: Object.values<any>(
              Object.values<any>(data.seasons)[0].episodes
            ).length,
          }
    ).map((item, index) => {
      tempEpisodeArray.push({
        title: `Episode ${index + 1}`,
        value: index + 1,
        focus: index === 0 ? true : false,
      });
    });
    setEpisode(tempEpisodeArray);
    return tempEpisodeArray;
  };

  const getVideoLink = async (quality: string, episode: any, voice: any) => {
    setIsPlaying(false);
    const title = route.params.creature.title;
    const voiceFocus = voice.find((el: any) => el.focus === true).title;
    const res = await searchAnimeWithVoice(title, voiceFocus);
    const episodeFocus = episode.find((el: any) => el.focus === true).value - 1;

    if (res.type === "anime") {
      const videoLink = await getAnimeUrl(res.link);
      setVideoLink(
        videoLink.data.links[quality].Src.includes("https:")
          ? videoLink.data.links[quality].Src
          : `https:${videoLink.data.links[quality].Src}`
      );
    } else {
      const videoLink = await getAnimeUrl(
        Object.values<any>(Object.values<any>(res.seasons)[0].episodes)[
          episodeFocus
        ].link
      );
      setVideoLink(
        videoLink.data.links[quality].Src.includes("https:")
          ? videoLink.data.links[quality].Src
          : `https:${videoLink.data.links[quality].Src}`
      );
    }
    setPosition(0);
  };

  useEffect(() => {
    (async () => {
      if (!isLoading) {
        setIsLoading(true);
        await getVideoLink(quality, episode, voice);
      }
    })();
  }, [quality, episode, voice]);

  useEffect(() => {
    (async () => {
      ScreenOrientation.unlockAsync();
      const title = route.params.creature.title;

      const allVoice: any[] = await getAllVoiceAnime(title);
      const tempVoiceArray: any[] = [];
      Array.from({ length: allVoice.length }).map((item, index) =>
        tempVoiceArray.push({
          title: allVoice[index],
          focus: index === 0 ? true : false,
        })
      );
      setVoice(tempVoiceArray);

      const episodes = await getEpisodeWithVoice(tempVoiceArray[0].title);

      await getVideoLink(quality, episodes, tempVoiceArray);

      const subscription =
        ScreenOrientation.addOrientationChangeListener(changeOrientation);

      return () => {
        ScreenOrientation.removeOrientationChangeListener(subscription);
      };
    })();
  }, []);

  useEffect(() => {
    console.log("Video Link Updated:", videoLink);
  }, [videoLink]);

  return (
    <>
      <>
        {isLoading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              backgroundColor: "#000",
            }}
          >
            <CircleProgress />
          </View>
        ) : (
          <>
            {showSkipText && (
              <>
                <Animated.View
                  style={[
                    {
                      backgroundColor: backgroundColor.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["#333333", "#666666"],
                      }),
                    },
                    {
                      width: "40%",
                      height: "100%",
                      position: "absolute",
                      zIndex: 3,
                      opacity: 0.4,

                      ...(skipTextSide === "left"
                        ? {
                            left: 0,
                            borderTopRightRadius: 100,
                            borderBottomRightRadius: 100,
                          }
                        : {
                            right: 0,
                            borderTopLeftRadius: 100,
                            borderBottomLeftRadius: 100,
                          }),
                    },
                  ]}
                ></Animated.View>
                <Animated.Text
                  style={[
                    styles.skipText,
                    {
                      ...(skipTextSide === "left"
                        ? full
                          ? { top: "47.5%", left: 100 }
                          : { top: "50%", left: 20 }
                        : full
                        ? { top: "47.5%", right: 100 }
                        : { top: "50%", right: 20 }),
                    },
                  ]}
                >
                  10 sec
                </Animated.Text>
              </>
            )}
          </>
        )}

        <SafeAreaView
          edges={full ? ["left", "right"] : ["left", "right", "bottom", "top"]}
          style={styles.container}
        >
          <View style={styles.content}>
            <Video
              key={videoLink}
              ref={video}
              source={{
                uri: videoLink,
              }}
              paused={!isPlaying}
              style={styles.video}
              onProgress={handlePlaybackStatusUpdate}
              onLoad={handleLoad}
              controls={true}
              rate={speed}
            />
            {isLoading ? (
              <View></View>
            ) : (
              <Animated.View
                style={[
                  visible
                    ? styles.controlsOverlay
                    : styles.controlsOverlaySecure,
                  { opacity: fadeAnim },
                ]}
              >
                {visible && (
                  <Animated.View
                    style={[
                      full ? [styles.controls, { left: 32 }] : styles.controls,
                      { opacity: fadeAnim },
                    ]}
                  >
                    <Controls
                      position={position}
                      duration={duration}
                      title={route.params.creature.title}
                      full={full}
                      isPlaying={isPlaying}
                      setIsPlaying={setIsPlaying}
                      valueChange={handleSliderChange}
                      skipBack={skipBack}
                      skipForward={skipForward}
                      setVisibleSpeed={setVisibleRightSpeed}
                      setVisibleVoice={setVisibleRightVoice}
                      setVisibleEpisode={setVisibleRightEpisode}
                      quality={quality}
                      setVisibleQuality={setVisibleRightQuality}
                      url={videoLink}
                    />
                  </Animated.View>
                )}

                <GestureDetector
                  gesture={Gesture.Exclusive(doubleTap, singleTap)}
                >
                  <View
                    style={{
                      width: "100%",
                      height: "50%",
                    }}
                  />
                </GestureDetector>
              </Animated.View>
            )}
          </View>
        </SafeAreaView>
      </>
      <RightModal
        fullScreen={full}
        visible={visibleRightSpeed}
        setVisible={setVisibleRightSpeed}
      >
        <View
          style={
            full
              ? { padding: 32 }
              : { paddingTop: 16, paddingHorizontal: 32, paddingBottom: 32 }
          }
        >
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setVisibleRightSpeed(false)}>
              <Back color="#FFF" />
            </TouchableOpacity>
            <Typography type="title" style={styles.rightTitle}>
              {t("screens.player.settings.speed")}
            </Typography>
          </View>
          <TouchableOpacity
            onPress={() => {
              setSpeed(0.5);
              setVisibleRightSpeed(false);
            }}
            disabled={speed === 0.5}
          >
            <Typography
              type="bold"
              style={
                speed === 0.5 ? styles.speedText : styles.speedTextNoneActive
              }
            >
              0.5
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSpeed(1);
              setVisibleRightSpeed(false);
            }}
            disabled={speed === 1.0}
          >
            <Typography
              type="bold"
              style={
                speed === 1.0 ? styles.speedText : styles.speedTextNoneActive
              }
            >
              1.0
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSpeed(1.5);
              setVisibleRightSpeed(false);
            }}
            disabled={speed === 1.5}
          >
            <Typography
              type="bold"
              style={
                speed === 1.5 ? styles.speedText : styles.speedTextNoneActive
              }
            >
              1.5
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSpeed(2.0);
              setVisibleRightSpeed(false);
            }}
            disabled={speed === 2.0}
          >
            <Typography
              type="bold"
              style={
                speed === 2.0 ? styles.speedText : styles.speedTextNoneActive
              }
            >
              2.0
            </Typography>
          </TouchableOpacity>
        </View>
      </RightModal>
      <RightModal
        fullScreen={full}
        visible={visibleRightVoice}
        setVisible={setVisibleRightVoice}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={
            full
              ? { padding: 32 }
              : { paddingTop: 16, paddingHorizontal: 32, paddingBottom: 32 }
          }
        >
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setVisibleRightVoice(false)}>
              <Back color="#FFF" />
            </TouchableOpacity>
            <Typography type="title" style={styles.rightTitle}>
              {t("screens.player.settings.voice")}
            </Typography>
          </View>
          {voice.map((item: any) => (
            <TouchableOpacity
              onPress={() => {
                handleChangeVoice(item.title);
                setVisibleRightVoice(false);
              }}
              disabled={item.focus}
            >
              <Typography
                type="bold"
                style={
                  item.focus ? styles.voiceText : styles.voiceTextNoneActive
                }
              >
                {item.title}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RightModal>
      <RightModal
        fullScreen={full}
        visible={visibleRightEpisode}
        setVisible={setVisibleRightEpisode}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={
            full
              ? { padding: 32 }
              : { paddingTop: 16, paddingHorizontal: 32, paddingBottom: 32 }
          }
        >
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setVisibleRightVoice(false)}>
              <Back color="#FFF" />
            </TouchableOpacity>
            <Typography type="title" style={styles.rightTitle}>
              {t("screens.player.settings.episode")}
            </Typography>
          </View>
          {episode.map((item: any) => (
            <TouchableOpacity
              onPress={() => {
                handleChangeEpisode(item.value);
                setVisibleRightEpisode(false);
              }}
              disabled={item.focus}
            >
              <Typography
                type="bold"
                style={
                  item.focus ? styles.episodeText : styles.episodeTextNoneActive
                }
              >
                {item.title}
              </Typography>
              <ProgressBar
                color="#7210FF"
                style={{
                  marginBottom: 32,
                  backgroundColor: "#35383F",
                  borderRadius: 4,
                }}
                progress={0}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RightModal>
      <RightModal
        fullScreen={full}
        visible={visibleRightQuality}
        setVisible={setVisibleRightQuality}
      >
        <View
          style={
            full
              ? { padding: 32 }
              : { paddingTop: 16, paddingHorizontal: 32, paddingBottom: 32 }
          }
        >
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setVisibleRightSpeed(false)}>
              <Back color="#FFF" />
            </TouchableOpacity>
            <Typography type="title" style={styles.rightTitle}>
              {t("screens.player.settings.quality")}
            </Typography>
          </View>
          <TouchableOpacity
            onPress={() => {
              setQuality("360");
              setVisibleRightQuality(false);
            }}
            disabled={quality === "360"}
          >
            <Typography
              type="bold"
              style={
                quality === "360"
                  ? styles.qualityText
                  : styles.qualityTextNoneActive
              }
            >
              360
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setQuality("480");
              setVisibleRightQuality(false);
            }}
            disabled={quality === "480"}
          >
            <Typography
              type="bold"
              style={
                quality === "480"
                  ? styles.qualityText
                  : styles.qualityTextNoneActive
              }
            >
              480
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setQuality("720");
              setVisibleRightQuality(false);
            }}
            disabled={quality === "720"}
          >
            <Typography
              type="bold"
              style={
                quality === "720"
                  ? styles.qualityText
                  : styles.qualityTextNoneActive
              }
            >
              720
            </Typography>
          </TouchableOpacity>
        </View>
      </RightModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlsOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, .5)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  controls: {
    position: "absolute",
    top: 16,
    bottom: 16,
    right: 16,
    left: 16,
  },
  controlsOverlaySecure: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  skipText: {
    position: "absolute",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 100,
  },
  rightTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
    color: "#FFF",
    marginLeft: 16,
  },
  speedText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    textAlign: "center",
    marginBottom: 32,
  },
  speedTextNoneActive: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.5)",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    textAlign: "center",
    marginBottom: 32,
  },
  voiceText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    marginBottom: 32,
  },
  voiceTextNoneActive: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.5)",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    marginBottom: 32,
  },
  episodeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  episodeTextNoneActive: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.5)",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  qualityText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    textAlign: "center",
    marginBottom: 32,
  },
  qualityTextNoneActive: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.5)",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    textAlign: "center",
    marginBottom: 32,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
});
