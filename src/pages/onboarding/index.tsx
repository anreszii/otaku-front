import { View, Animated, Easing, StyleSheet } from "react-native";
import { useRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useAsyncStorage from "src/lib/hooks/use-async-storage";
import { RootStackParamList } from "src/lib/routes";
import { OnboardingData, OnboardingDots } from "modules/onboarding-content";
import { Button } from "ui/button";
import { PosterBackground } from "components/layouts/poster-background";
import { InstructionItem } from "modules/onboarding-content/types/type";
import { instructions } from "modules/onboarding-content/data/onboarding-card.data";

type RenderItemProps = {
  item: InstructionItem;
  index: number;
};

export const Onboarding = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<Carousel<InstructionItem> | null>(null);
  const { setValue } = useAsyncStorage("seeOnboarding");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
      <View style={styles.itemContent}>
        <OnboardingData title={item.title} description={item.description} />
        <Button
          style={{ width: "60%" }}
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
      </View>
    );
  };

  return (
    <PosterBackground>
      <View style={styles.instructionContainer}>
        <Pagination
          dotsLength={instructions.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          renderDots={OnboardingDots}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <Carousel
          scrollEnabled={false}
          ref={carouselRef}
          data={instructions}
          renderItem={renderItem}
          sliderWidth={320}
          style={styles.spacing}
          itemWidth={300}
          sliderHeight={100}
          itemHeight={100}
          onSnapToItem={(index) => setActiveSlide(index)}
          containerCustomStyle={styles.carousel}
        />
      </View>
    </PosterBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181A20",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
  carousel: {
    flexGrow: 0,
    marginBottom: 35,
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
  spacing: {
    justifyContent: "space-between",
  },
  itemContent: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 225,
  },
});
