import { View } from "react-native";
import { FC } from "react";

const Overlay: FC = () => {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
    />
  );
};

export default Overlay;
