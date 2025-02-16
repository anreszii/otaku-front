import { View, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { Pagination } from "react-native-snap-carousel";
import { Button, PosterBackground } from "ui";
import { OnboardingData, OnboardingDots } from "./components";
import { instructions } from "./data";
import { InstructionItem } from "./types";
import useStorage from "shared/hooks/useStorage";
import { useTypedNavigation } from "shared/hooks";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

interface RenderItemProps {
  item: InstructionItem;
  index: number;
}

const Onboarding: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselRef = useRef<ICarouselInstance>(null);

  const { setValue } = useStorage("seeOnboarding", false);

  const navigation = useTypedNavigation();

  const handleNavigation = () => {
    setValue(true);
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  };

  const handleButtonPress = async (isLast: boolean) => {
    if (isLast) {
      handleNavigation();
    } else {
      const nextIndex = activeSlide + 1;
      setActiveSlide(nextIndex);
      carouselRef.current?.scrollTo({ index: nextIndex, animated: true });
    }
  };

  const renderItem = ({ item, index }: RenderItemProps) => {
    const isLast = index === instructions.length - 1;

    return (
      <View style={styles.itemContent}>
        <OnboardingData title={item.title} description={item.description} />
        <Button
          style={styles.button}
          variant="contain"
          title={isLast ? "Начать" : "Далее"}
          onPress={() => handleButtonPress(isLast)}
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
          ref={carouselRef}
          loop={false}
          width={320}
          height={340}
          data={instructions}
          renderItem={renderItem}
          onSnapToItem={(index) => {
            setActiveSlide(index);
          }}
          autoPlay={false}
        />
      </View>
    </PosterBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "60%",
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
    backgroundColor: "#2E2F3A",
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "rgba(238, 238, 238, 0.1)",
    paddingTop: 20,
    paddingHorizontal: 5,
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-between",
    height: 340,
  },
  itemContent: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 250,
  },
});

export default Onboarding;
