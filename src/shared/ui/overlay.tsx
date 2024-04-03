import { View } from "react-native";

const Overlay: React.FC = () => {
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
