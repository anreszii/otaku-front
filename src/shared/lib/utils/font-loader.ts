import * as Font from "expo-font";

export const fontLoader = async () => {
  await Font.loadAsync({
    NotoSansJPRegular: require("assets/fonts/NotoSansJP-Regular.ttf"),
    NotoSansJPBold: require("assets/fonts/NotoSansJP-Bold.ttf"),
    NotoSansJPSemiBold: require("assets/fonts/NotoSansJP-SemiBold.ttf"),
    NotoSansJPMedium: require("assets/fonts/NotoSansJP-Medium.ttf"),
    UrbanistRegular: require("assets/fonts/Urbanist-Regular.ttf"),
    UrbanistBold: require("assets/fonts/Urbanist-Bold.ttf"),
    UrbanistSemiBold: require("assets/fonts/Urbanist-SemiBold.ttf"),
    UrbanistMedium: require("assets/fonts/Urbanist-Medium.ttf"),
  });
};
