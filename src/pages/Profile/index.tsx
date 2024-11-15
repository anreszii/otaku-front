import React from "react";
import { Layout } from "components";
import { Button, Typography } from "ui";
import { useAuthStore, useUserStore } from "shared/stores";
import { Image } from "expo-image";
import LinearGradient from "react-native-linear-gradient";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";
import { ArrowRightIcon, LogoutIcon } from "shared/icons";

const Profile = () => {
  const { user, fetchUser } = useUserStore();
  const { logout } = useAuthStore();

  const { top } = useSafeAreaInsets();
  const navigation = useTypedNavigation();

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    return `${hours} часов`;
  };

  return (
    <>
      <View style={styles.background}>
        <Image
          source={user?.background}
          style={styles.backgroundImage}
          contentFit="cover"
        />
        <LinearGradient
          colors={["transparent", "#0B1218"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.backgroundGradient}
        />
        <Image
          source={user?.avatar}
          style={[styles.avatar, { top: top }]}
          contentFit="cover"
        />
      </View>
      <Layout noMargin scroll>
        <View style={styles.container}>
          <View style={styles.header}>
            <Typography fontFamily="Urbanist" style={styles.username}>
              {user?.username}
            </Typography>
            <Typography fontFamily="Urbanist" style={styles.timeWatch}>
              {formatTime(user?.totalWatch || 0)}
            </Typography>
            <Button
              title="Редактировать"
              variant="contain"
              color="#0B1218"
              style={styles.buttonEdit}
            />
          </View>
          <View style={styles.friends}>
            <View style={styles.friendsHeader}>
              <Typography fontFamily="Urbanist" style={styles.friendsTitle}>
                Друзья ({user?.friends.length})
              </Typography>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.friendsAll}
                onPress={() => {
                  navigation.navigate("Friends");
                }}
              >
                <Typography fontFamily="Urbanist" style={styles.friendsAllText}>
                  Все
                </Typography>
              </TouchableOpacity>
            </View>
            {(user?.friends.length || 0) > 0 && (
              <View style={styles.friendsList}>
                {user?.friends.slice(0, 5).map((friend) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.friendsItem}
                    key={friend._id}
                  >
                    <Image
                      source={friend.avatar}
                      style={styles.friendsItemAvatar}
                    />
                    <Typography
                      fontFamily="Urbanist"
                      style={styles.friendsItemUsername}
                    >
                      {friend.username}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={styles.friends}>
            <View style={styles.friendsHeader}>
              <Typography fontFamily="Urbanist" style={styles.friendsTitle}>
                Подписчики ({user?.subscribers.length})
              </Typography>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.friendsAll}
                onPress={() => {
                  navigation.navigate("Subscribers");
                }}
              >
                <Typography fontFamily="Urbanist" style={styles.friendsAllText}>
                  Все
                </Typography>
              </TouchableOpacity>
            </View>
            {(user?.subscribers.length || 0) > 0 && (
              <View style={styles.friendsList}>
                {user?.subscribers.slice(0, 5).map((friend) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.friendsItem}
                    key={friend._id}
                  >
                    <Image
                      source={friend.avatar}
                      style={styles.friendsItemAvatar}
                    />
                    <Typography
                      fontFamily="Urbanist"
                      style={styles.friendsItemUsername}
                    >
                      {friend.username}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={styles.statistics}>
            <View style={styles.statisticsRow}>
              <View style={styles.statisticsItem}>
                <Typography
                  fontFamily="Urbanist"
                  style={styles.statisticsItemTitle}
                >
                  {user?.viewed.length}
                </Typography>
                <Typography
                  fontFamily="Urbanist"
                  style={styles.statisticsItemSubtitle}
                >
                  Просмотрено аниме
                </Typography>
              </View>
              <View style={styles.statisticsItem}>
                <Typography
                  fontFamily="Urbanist"
                  style={styles.statisticsItemTitle}
                >
                  {user?.animeList.length}
                </Typography>
                <Typography
                  fontFamily="Urbanist"
                  style={styles.statisticsItemSubtitle}
                >
                  В избранном
                </Typography>
              </View>
            </View>
            <View style={[styles.statisticsRow, { marginTop: 10 }]}>
              <View style={styles.statisticsItem}>
                <Typography
                  fontFamily="Urbanist"
                  style={styles.statisticsItemTitle}
                >
                  {0}
                </Typography>
                <Typography
                  fontFamily="Urbanist"
                  style={styles.statisticsItemSubtitle}
                >
                  Просмотрено серий
                </Typography>
              </View>
              <View style={styles.statisticsItem}>
                <Typography
                  fontFamily="Urbanist"
                  style={styles.statisticsItemTitle}
                >
                  {0}
                </Typography>
                <Typography
                  fontFamily="Urbanist"
                  style={styles.statisticsItemSubtitle}
                >
                  Обзоров
                </Typography>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.logout}
            activeOpacity={0.7}
            onPress={logout}
          >
            <View style={styles.logoutRow}>
              <LogoutIcon />
              <Typography fontFamily="Montserrat" style={styles.logoutTitle}>
                Выход
              </Typography>
            </View>
            <ArrowRightIcon />
          </TouchableOpacity>
        </View>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 185,
  },
  backgroundImage: {
    width: "100%",
    height: 185,
    position: "absolute",
  },
  backgroundGradient: {
    width: "100%",
    height: 185,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#1A80E5",
    position: "absolute",
    alignSelf: "center",
  },
  container: {
    paddingHorizontal: 25,
  },
  header: {
    marginTop: 20,
    backgroundColor: "#2E2F3A",
    padding: 20,
    borderRadius: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timeWatch: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonEdit: {
    marginTop: 20,
  },
  friends: {
    marginTop: 25,
  },
  friendsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  friendsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  friendsAll: {},
  friendsAllText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A80E5",
  },
  friendsList: {
    backgroundColor: "#2E2F3A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  friendsItem: {
    alignItems: "center",
    gap: 5,
  },
  friendsItemAvatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  friendsItemUsername: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statistics: {
    marginTop: 25,
  },
  statisticsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statisticsItem: {
    backgroundColor: "#2E2F3A",
    padding: 10,
    borderRadius: 10,
    width: Dimensions.get("window").width / 2 - 30,
  },
  statisticsItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statisticsItemSubtitle: {
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "500",
    marginTop: 5,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoutTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Profile;
