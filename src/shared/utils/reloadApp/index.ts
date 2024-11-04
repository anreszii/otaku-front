import { DevSettings } from "react-native";
import RNRestart from "react-native-restart";

const reloadApp = () => {
  if (__DEV__) {
    DevSettings.reload();
  } else {
    RNRestart.Restart();
  }
};

export default reloadApp;
