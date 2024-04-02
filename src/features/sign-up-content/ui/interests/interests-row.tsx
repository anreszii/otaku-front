import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { interestsItem } from "entities/interests-item";
import Typography from "shared/ui/typography";

export const InterestsRow = () => {
  const [interests, setInterests] = useState(interestsItem);

  const handleChangeFocus = (title: string) => {
    setInterests(
      interests.map((item) =>
        item.title === title ? { ...item, focus: !item.focus } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      {interests.map((item) => (
        <TouchableOpacity
          style={item.focus ? styles.badgeActive : styles.badge}
          onPress={() => handleChangeFocus(item.title)}
          key={item.title}
        >
          <Typography variant="sub-bold" style={styles.badgeTitle}>
            {item.ru_title}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  content: {
    marginVertical: 24,
  },
  badge: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#4169E1",
    borderRadius: 100,
    height: 45,
  },
  badgeActive: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: "#4169E1",
    borderWidth: 2,
    borderColor: "#4169E1",
    borderRadius: 100,
    height: 45,
  },
  badgeTitle: {
    fontSize: 18,
    color: "#fff",
  },
});
