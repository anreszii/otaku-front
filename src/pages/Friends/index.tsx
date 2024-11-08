import React, { useState } from "react";
import { Layout } from "components";
import { Field, Typography } from "ui";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useUserStore } from "shared/stores";
import { debounce } from "lodash";
import { Image } from "expo-image";

const Friends = () => {
  const { fetchSearchUsers, searchUsers, setSearchUsers } = useUserStore();

  const [search, setSearch] = useState("");

  const handleSearch = React.useCallback(
    debounce((query: string) => {
      setSearchUsers([]);
      fetchSearchUsers(query);
    }, 750),
    []
  );

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
      {searchUsers.map((user) => (
        <TouchableOpacity style={styles.user}>
          <Image source={{ uri: user.avatar || "" }} style={styles.avatar} />
          <Typography fontFamily="Urbanist" style={styles.username}>
            {user.username}
          </Typography>
        </TouchableOpacity>
      ))}
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
    gap: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Friends;
