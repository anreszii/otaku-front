import { View, Animated, Easing, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { ImageBackground } from "expo-image";
import Overlay from "@/components/ui/Overlay";
import { Defs, LinearGradient, Rect, Stop, Svg } from "react-native-svg";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { TypographyComponent } from "@/components/ui/Typography";
import { InstructionItem, RenderItemProps } from "@/types/views/onboarding";
import Button from "@/components/ui/Button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TypeRootStackParamList } from "@/navigation/navigation.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAsyncStorage from "@/hooks/useAsyncStorage";

const Onboarding = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<Carousel<InstructionItem> | null>(null);
  const [dotWidth, dotHeight] = [68, 6];
  const { setValue } = useAsyncStorage("seeOnboarding");

  const navigation = useNavigation<NavigationProp<TypeRootStackParamList>>();

  const AnimatedText = Animated.createAnimatedComponent(TypographyComponent);

  const instructions: InstructionItem[] = [
    {
      title: "Добро пожаловать в AniUp",
      description:
        "Смотрите аниме в лучшем качестве и без ограничений, мы предлагаем множество разных тайтлов и их озвучек",
    },
    {
      title: "Смотрите вместе любимые аниме",
      description:
        "Мы разработали уникальный функционал, для совместного просмотра ваших любимых тайтлов. Смотрите в друзьями или заходите в открыте комнаты",
    },
    {
      title: "Скачивайте любимые тайтлы",
      description:
        "Вы можете скачать любимые серии аниме и смотреть их без использования интернета",
    },
  ];

  const animations = [...Array(3)].map((_) => ({
    position: useRef(new Animated.Value(40)).current,
    opacity: useRef(new Animated.Value(0)).current,
  }));

  const animate = (index: number) => {
    animations[index].position.setValue(40);
    animations[index].opacity.setValue(0);
    return Animated.sequence([
      Animated.parallel([
        Animated.timing(animations[index].position, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animations[index].opacity, {
          toValue: index == 1 ? 0.6 : 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(animations[index].position, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);
  };

  const renderItem = ({ item, index }: RenderItemProps) => {
    const isLast = instructions.length - 1 === index;

    Animated.sequence(
      [...Array(3).keys()].map((index) => animate(index))
    ).start();

    return (
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          height: 225,
        }}
      >
        <View>
          <AnimatedText
            style={[styles.instructionText, styles.instructionTitle]}
          >
            {item.title}
          </AnimatedText>
        </View>
        <View>
          <AnimatedText
            style={[styles.instructionText, styles.instructionDescription]}
          >
            {item.description}
          </AnimatedText>
        </View>

        <Animated.View style={{ width: "60%" }}>
          <Button
            variant="contain"
            title={isLast ? "Начать" : "Далее"}
            onPress={() => {
              setActiveSlide(activeSlide + 1);
              if (isLast) {
                setValue(true);
                navigation.navigate("Welcome");
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Welcome" }],
                });
              } else {
                if (carouselRef.current) {
                  carouselRef.current.snapToNext();
                }
              }
            }}
          />
        </Animated.View>
      </View>
    );
  };

  const renderDot = (activeIndex: number, total: number) => {
    return [...Array(total)].map((_, index) => (
      <Svg
        width={dotWidth}
        height={dotHeight}
        viewBox={`0 0 ${dotWidth} ${dotHeight}`}
        fill="none"
        key={index}
        style={{
          marginRight: total - 1 === index ? 0 : 10,
        }}
      >
        <Defs>
          <LinearGradient
            id="linear_button"
            x1={13}
            y1={0}
            x2={dotWidth}
            y2={dotHeight}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#4169E1" />
            <Stop offset={1} stopColor="#4169E1" />
          </LinearGradient>
        </Defs>
        {activeIndex === index ? (
          <Rect
            width={dotWidth}
            height={dotHeight}
            rx={3}
            fill="url(#linear_button)"
          />
        ) : (
          <Rect width={dotWidth} height={dotHeight} rx={3} fill="#3C4146" />
        )}
      </Svg>
    ));
  };

  return (
    <ImageBackground
      source={require("assets/backgroundOnboarding.png")}
      style={{
        backgroundColor: "#181A20",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100%",
      }}
    >
      <Overlay />
      <View style={styles.instructionContainer}>
        <Pagination
          dotsLength={instructions.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          renderDots={renderDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <Carousel
          scrollEnabled={false}
          ref={carouselRef}
          data={instructions}
          renderItem={renderItem}
          sliderWidth={320}
          style={[styles.spacing]}
          itemWidth={300}
          sliderHeight={100}
          itemHeight={100}
          onSnapToItem={(index) => setActiveSlide(index)}
          containerCustomStyle={styles.carousel}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-end",
  },
  carousel: {
    flexGrow: 0,
    marginBottom: 35,
  },
  backgroundContainerWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  paginationContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 40,
  },
  instructionContainer: {
    width: "90%",
    backgroundColor: "#2B3033",
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "rgba(238, 238, 238, 0.1)",
    paddingTop: 20,
    paddingHorizontal: 5,
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-between",
  },
  instructionText: {
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
    justifyContent: "flex-end",
  },
  instructionTitle: {
    fontWeight: "600",
    fontSize: 20,
  },
  instructionDescription: {
    opacity: 0.6,
    fontWeight: "500",
    fontSize: 16,
  },
  instructionButton: {
    marginTop: "auto",
  },
  spacing: {
    justifyContent: "space-between",
  },
});

export default Onboarding;
