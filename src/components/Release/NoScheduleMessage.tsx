import React from "react";
import { View } from "react-native";
import Typography from "../ui/Typography";
import { useTranslation } from "react-i18next";

const NoScheduleMessage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Typography
        style={{
          fontSize: 24,
          fontWeight: "600",
          lineHeight: 28.8,
          textAlign: "center",
          marginTop: 124,
        }}
        type="title"
        gradient={true}
      >
        {t("screens.release.noRelease.noReleaseTitle")}
      </Typography>
      <Typography
        style={{
          fontSize: 18,
          fontWeight: "500",
          lineHeight: 25.2,
          letterSpacing: 0.2,
          textAlign: "center",
        }}
        type="regular"
      >
        {t("screens.release.noRelease.noReleaseSubtitle")}
      </Typography>
    </View>
  );
};

export default NoScheduleMessage;
