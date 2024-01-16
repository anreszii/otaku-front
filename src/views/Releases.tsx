import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { format, addDays } from "date-fns";
import Calendar from "../components/ui/Calendar";
import Loader from "../components/ui/Loader";
import ReleaseItem from "../components/Release/ReleaseItem";
import NoScheduleMessage from "../components/Release/NoScheduleMessage";
import { getOngoingsList } from "../api/kodik/getOngoignsList";
import { commonStyles } from "../style/releaseStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userService from "../api/user/userService";
import Header from "../components/Layouts/Header";

interface SeriesData {
  date: number;
  dayOfWeek: string;
  focus: boolean;
  series?: OngoingData[];
}

interface OngoingData {
  title: string;
  isFavorite: boolean;
  material_data: {
    title: string;
    anime_title: string;
    poster_url: string;
    next_episode_at: string;
    screenshots?: string[];
    episodes_aired: number;
    shikimori_rating: string;
  };
  screenshots: string[];
}

const Releases: React.FC = () => {
  const now = new Date();

  const initialDateList: SeriesData[] = Array.from({ length: 7 }).map(
    (_, index) => {
      const currentDate = addDays(now, index);
      const formattedDate = parseInt(format(currentDate, "d"), 10);
      const dayOfWeek = format(currentDate, "EEEE");

      return {
        date: formattedDate,
        dayOfWeek,
        focus: index === 0,
        series: [],
      };
    }
  );

  const [dateList, setDateList] = useState<SeriesData[]>(initialDateList);
  const [isLoading, setIsLoading] = useState(true);
  const [flag, setFlag] = useState(false);

  const getFavorite = async (title: string) => {
    try {
      const id = await AsyncStorage.getItem("id");
      const response = await userService.getFavoriteList(String(id));
      const favoriteList = response.data;

      return favoriteList.findIndex((el: any) => el.title === title) !== -1;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    const fetchOngoings = async () => {
      try {
        const result = await getOngoingsList();
        const uniqueAnimeMap: Record<string, OngoingData[]> = {};

        result.forEach((item: OngoingData) => {
          const title = item.title;
          if (!uniqueAnimeMap[title]) {
            uniqueAnimeMap[title] = [];
          }
          uniqueAnimeMap[title].push(item);
        });

        const uniqueOngoings: OngoingData[] = Object.values(uniqueAnimeMap)
          .flat()
          .filter((value, index, self) => {
            const titles = self.map((item) => item.title);
            return titles.indexOf(value.title) === index;
          });

        const sortedOngoings = uniqueOngoings
          .filter((item) => item.material_data.next_episode_at)
          .sort((a, b) => {
            const dateA = new Date(a.material_data.next_episode_at);
            const dateB = new Date(b.material_data.next_episode_at);
            return dateA.getTime() - dateB.getTime();
          });

        const updatedDateList: any = dateList.map(async (day) => {
          const series = sortedOngoings.filter((item) => {
            const episodeDate = new Date(item.material_data.next_episode_at);
            return episodeDate.getDate() === day.date;
          });

          const updatedSeries = await Promise.all(
            series.map(async (item) => {
              const isFavorite = await getFavorite(item.title);
              return { ...item, isFavorite };
            })
          );

          return {
            ...day,
            series: updatedSeries,
          };
        });

        Promise.all(updatedDateList).then((data) => {
          setDateList(data);
          setIsLoading(false);
        });
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };

    fetchOngoings();
  }, [flag]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={commonStyles.container}>
          <Header title="Release Calendar" />
          <View style={{ marginTop: 62 }}>
            <Calendar dateList={dateList} setDateList={setDateList} />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={commonStyles.scrollContainer}
          >
            {dateList.map((item, index) => (
              <React.Fragment key={index}>
                {item.focus && item.series && item.series.length > 0 ? (
                  <>
                    {item.series.map(
                      (seriesItem: OngoingData, seriesIndex: number) => (
                        <React.Fragment key={seriesIndex}>
                          <ReleaseItem
                            flag={flag}
                            setFlag={setFlag}
                            seriesItem={seriesItem}
                          />
                        </React.Fragment>
                      )
                    )}
                  </>
                ) : (
                  <>
                    {item.focus &&
                      (!item.series || item.series.length === 0) && (
                        <NoScheduleMessage key={`no-schedule-${index}`} />
                      )}
                  </>
                )}
              </React.Fragment>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default Releases;
