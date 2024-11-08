import React, { useEffect, useState } from "react";
import { Layout } from "components";
import { Field, Typography } from "ui";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useUserStore } from "shared/stores";
import { debounce } from "lodash";
import { Image } from "expo-image";
import { ISearchUser } from "shared/types";
import { FlashList } from "@shopify/flash-list";
import { PlusIcon } from "shared/icons";

const Friends = () => {
  const { fetchSearchUsers, searchUsers, setSearchUsers, user } =
    useUserStore();

  const [search, setSearch] = useState("");

  const [isEmptyResult, setIsEmptyResult] = useState(false);

  const handleSearch = React.useCallback(
    debounce(async (query: string) => {
      setSearchUsers([]);
      setIsEmptyResult(false);
      if (query.trim()) {
        const resultLength = await fetchSearchUsers(query);
        setIsEmptyResult(resultLength === 0);
      }
    }, 750),
    []
  );

  useEffect(() => {
    return () => {
      setSearchUsers([]);
    };
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: ISearchUser;
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
        <TouchableOpacity style={styles.userButton} activeOpacity={0.7}>
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
      <Field
        placeholder="Поиск друзей"
        style={styles.searchField}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          handleSearch(text);
        }}
      />
      <FlashList
        data={searchUsers}
        renderItem={renderItem}
        estimatedItemSize={50}
        ListEmptyComponent={() =>
          isEmptyResult && <EmptyList title="Пользователи не найдены" />
        }
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  searchField: {
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
    marginTop: 100,
  },
  emptyListTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Friends;
