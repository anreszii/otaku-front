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
}

export const Header = ({ back, title }: Props) => {
  const insets = useSafeAreaInsets();

  const { goBack } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View
      style={
        back
          ? {
              paddingTop: insets.top,
              backgroundColor: "#0B1218",
              paddingHorizontal: 24,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }
          : {
              paddingTop: insets.top,
              backgroundColor: "#0B1218",
              paddingHorizontal: 24,
              alignItems: "center",
            }
      }
    >
      {back && (
        <TouchableOpacity style={{ marginRight: -22 }} onPress={goBack}>
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
      <Typography variant="title-bold">{title}</Typography>
    </View>
  );
};
