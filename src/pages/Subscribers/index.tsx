import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { Layout } from "components";
import { useUserStore } from "shared/stores";
import { FlashList } from "@shopify/flash-list";
import { IUserFriend } from "shared/types";
import { Image } from "expo-image";
import { Typography } from "ui";
import { PlusIcon } from "shared/icons";
import { useFocusEffect } from "@react-navigation/native";

const Subscribers = () => {
  const { user, fetchUser, addFriend } = useUserStore();

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: IUserFriend;
    index: number;
  }) => {
    return (
      <View style={styles.user}>
        <View style={styles.userRow}>
          <Image source={{ uri: item.avatar || "" }} style={styles.avatar} />
          <Typography fontFamily="Urbanist" style={styles.username}>
            {item.username}
          </Typography>
        </View>
        <TouchableOpacity
          style={styles.userButton}
          activeOpacity={0.7}
          onPress={() => addFriend(item._id)}
        >
          <PlusIcon />
        </TouchableOpacity>
      </View>
    );
  };

  const EmptyList = ({ title }: { title: string }) => {
    return (
      <View style={styles.emptyListContainer}>
        <Typography fontFamily="Montserrat" style={styles.emptyListTitle}>
          {title}
        </Typography>
      </View>
    );
  };

  return (
    <Layout>
      <View style={styles.container}>
        {user?.subscribers.length === 0 ? (
          <EmptyList title="Список подписчиков пуст" />
        ) : (
          <FlashList
            data={user?.subscribers}
            renderItem={renderItem}
            estimatedItemSize={50}
          />
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userButton: {},
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  emptyListTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  separator: {
    height: 15,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 15,
  },
});

export default Subscribers;
