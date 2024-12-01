import { View, Text, PanResponder, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAnimeStore } from "shared/stores";
import BackButton from "ui/BackButton";
import { Video } from "expo-av";
import Loader from "ui/Loader";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import Modal from "react-native-modal";

interface PlayerModalProps {
  visible: boolean;
  onClose: () => void;
  episodeLink: string;
}

const Player: React.FC<PlayerModalProps> = ({
  visible,
  onClose,
  episodeLink,
}) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { fetchAnimeUrl } = useAnimeStore();
  const [isMinimized, setIsMinimized] = useState(false);
  const animatedWidth = useSharedValue(1);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      const response = await fetchAnimeUrl(episodeLink);
      const formatLink = (link: string) => {
        if (link.includes("https:")) {
          return link;
        } else {
          return `https:${link}`;
        }
      };

      setVideoUrl(formatLink(response.links["720"].Src));
      setIsLoading(false);
    };

    if (visible && episodeLink) {
      fetchVideoUrl();
    }
  }, [visible, episodeLink]);

  const minimizeModal = () => {
    setIsMinimized(true);
    animatedWidth.value = withTiming(0.4, { duration: 300 });
  };

  const maximizeModal = () => {
    setIsMinimized(false);
    animatedWidth.value = withTiming(1, { duration: 300 });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Обновление позиции модалки
      // ...
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { dy } = gestureState;
      if (dy > 50) {
        minimizeModal();
      } else if (dy < -50) {
        maximizeModal();
      }
    },
  });

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <Animated.View
        style={[styles.container, { width: `${animatedWidth.value * 100}%` }]}
        {...panResponder.panHandlers}
      >
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : (
          <Video
            source={{ uri: videoUrl }}
            style={styles.video}
            useNativeControls
          />
        )}
        <BackButton onPress={onClose} />
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
});

export default Player;
