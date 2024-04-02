import { Image } from "expo-image";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ViewComponent,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackIcon } from "../icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "shared/routes";
import Typography from "shared/ui/typography";

interface Props {
  back?: boolean;
  title?: string;
  onPress?: (() => void) | false;
}

export const Header = ({ back, title, onPress }: Props) => {
  const insets = useSafeAreaInsets();

  const { goBack } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View
      style={
        back
          ? title
            ? {
                paddingTop: insets.top + 12,
                backgroundColor: "#0B1218",
                paddingHorizontal: 24,
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 12,
              }
            : {
                paddingTop: insets.top,
                backgroundColor: "#0B1218",
                paddingHorizontal: 24,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 12,
              }
          : {
              paddingTop: insets.top,
              backgroundColor: "#0B1218",
              paddingHorizontal: 24,
              alignItems: "center",
              paddingBottom: 12,
            }
      }
    >
      {back && (
        <TouchableOpacity
          style={title ? { marginRight: 24 } : { marginRight: -22 }}
          onPress={onPress ? onPress : goBack}
        >
          <BackIcon />
        </TouchableOpacity>
      )}
      {!title && (
        <Image
          source={require("assets/aniyp.png")}
          style={{
            width: 104,
            height: 56,
            marginRight: "auto",
            marginLeft: "auto",
          }}
        />
      )}
      {title && (
        <Typography
          variant="title-bold"
          style={{
            color: "#fff",
            fontSize: 18,
            letterSpacing: 0.2,
          }}
        >
          {title}
        </Typography>
      )}
    </View>
  );
};
