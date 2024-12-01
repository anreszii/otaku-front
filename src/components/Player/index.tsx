import { View, Text, PanResponder, StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAnimeStore } from "shared/stores";
import Modal from "ui/Modal";
import BackButton from "ui/BackButton";
import { Video } from "expo-av";
import Loader from "ui/Loader";

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
  const animatedWidth = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchVideoUrl = async () => {
      const response = await fetchAnimeUrl(episodeLink);
      setVideoUrl(response.links["720"].Src);
      setIsLoading(false);
    };

    if (visible) {
      fetchVideoUrl();
    }
  }, [visible, episodeLink]);

  const minimizeModal = () => {
    setIsMinimized(true);
    Animated.timing(animatedWidth, {
      toValue: 0.4, // 40% ширины
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const maximizeModal = () => {
    setIsMinimized(false);
    Animated.timing(animatedWidth, {
      toValue: 1, // 100% ширины
      duration: 300,
      useNativeDriver: false,
    }).start();
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
      animationOut="slideInDown"
    >
      <Animated.View style={styles.container} {...panResponder.panHandlers}>
        {isLoading ? (
          <Loader />
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
});

export default Player;
