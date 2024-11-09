import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "components";
import { Field, Typography, Loader } from "ui";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useUserStore } from "shared/stores";
import { debounce } from "lodash";
import { Image } from "expo-image";
import { ISearchUser, IUser, IUserFriend } from "shared/types";
import { FlashList } from "@shopify/flash-list";
import { PlusIcon, CrossIcon } from "shared/icons";
import { useFocusEffect } from "@react-navigation/native";

const Friends = () => {
  const {
    fetchSearchUsers,
    searchUsers,
    setSearchUsers,
    user,
    fetchUser,
    addFriend,
    deleteFriend,
  } = useUserStore();

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = React.useCallback(
    debounce(async (query: string) => {
      if (query.trim()) {
        await fetchSearchUsers(query);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }, 750),
    []
  );

  useEffect(() => {
    return () => {
      setSearchUsers([]);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  const getFilteredFriends = () => {
    if (!search.trim()) return user?.friends || [];
    return (user?.friends || []).filter((friend) =>
      friend.username.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleAddFriend = async (id: string) => {
    setIsLoading(true);
    const userToAdd = searchUsers.find((user) => user._id === id);
    if (userToAdd) {
      const filteredUsers = searchUsers.filter((user) => user._id !== id);
      setSearchUsers(filteredUsers);
    }
    await addFriend(id);
    if (search.trim()) {
      await fetchSearchUsers(search);
    }
    setIsLoading(false);
  };

  const handleDeleteFriend = async (id: string) => {
    setIsLoading(true);
    await deleteFriend(id);
    if (search.trim()) {
      await fetchSearchUsers(search);
    }
    setIsLoading(false);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ISearchUser | IUserFriend;
    index: number;
  }) => {
    const isFriend = !("level" in item) ? false : true;

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
          onPress={() =>
            isFriend ? handleDeleteFriend(item._id) : handleAddFriend(item._id)
          }
        >
          {isFriend ? <CrossIcon /> : <PlusIcon />}
        </TouchableOpacity>
      </View>
    );
  };

  const ListSeparator = () => <View style={styles.separator} />;

  const filteredFriends = getFilteredFriends();
  const combinedData = search.trim()
    ? [
        ...(filteredFriends.length > 0
          ? [{ type: "friends", data: filteredFriends }]
          : []),
        ...(searchUsers.length > 0
          ? [{ type: "users", data: searchUsers }]
          : []),
      ]
    : [{ type: "friends", data: filteredFriends }];

  const isDataEmpty =
    !isLoading &&
    (combinedData.every((section) => section.data.length === 0) ||
      combinedData.length === 0);

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
          setSearchUsers([]);
          setIsLoading(true);
          handleSearch(text);
          if (!text.trim()) {
            setIsLoading(false);
          }
        }}
      />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ) : isDataEmpty ? (
        <EmptyList
          title={
            search.trim() ? "Пользователи не найдены" : "Список друзей пуст"
          }
        />
      ) : (
        <FlashList
          data={combinedData}
          renderItem={({ item: section }) => (
            <>
              {section.data.map((item, index) => (
                <React.Fragment key={item._id}>
                  {index > 0 && <ListSeparator />}
                  {renderItem({ item, index })}
                </React.Fragment>
              ))}
            </>
          )}
          estimatedItemSize={50}
          ItemSeparatorComponent={() => (
            <View
              style={[
                styles.sectionSeparator,
                { opacity: combinedData.length > 1 ? 1 : 0 },
              ]}
            />
          )}
        />
      )}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
});

export default Friends;
