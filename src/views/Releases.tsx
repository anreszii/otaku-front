import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { format, addDays } from "date-fns"; // Добавлен импорт
import HeaderReleases from "../components/Layouts/HeaderReleases";
import Calendar from "../components/ui/Calendar";
import Loader from "../components/ui/Loader";
import ReleaseItem from "../components/Release/ReleaseItem";
import NoScheduleMessage from "../components/Release/NoScheduleMessage";
import { getOngoingsList } from "../api/kodik/getOngoignsList";
import { commonStyles } from "../style/releaseStyle";
import { LinearGradient } from "expo-linear-gradient";

interface SeriesData {
  date: number;
  dayOfWeek: string;
  focus: boolean;
  series?: OngoingData[];
}

interface OngoingData {
  material_data: {
    title: string;
    anime_title: string;
    next_episode_at: string;
    screenshots?: string[];
    episodes_aired: number;
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

  useEffect(() => {
    const fetchOngoings = async () => {
      try {
        const { data } = await getOngoingsList();
        const uniqueAnimeMap: Record<string, OngoingData[]> = {};

        data.results.forEach((item: OngoingData) => {
          const title = item.material_data.title;
          if (!uniqueAnimeMap[title]) {
            uniqueAnimeMap[title] = [];
          }
          uniqueAnimeMap[title].push(item);
        });

        const uniqueOngoings: OngoingData[] = Object.values(uniqueAnimeMap)
          .flat()
          .filter((value, index, self) => {
            const titles = self.map((item) => item.material_data.title);
            return titles.indexOf(value.material_data.title) === index;
          });

        const sortedOngoings = uniqueOngoings
          .filter((item) => item.material_data.next_episode_at)
          .sort((a, b) => {
            const dateA = new Date(a.material_data.next_episode_at);
            const dateB = new Date(b.material_data.next_episode_at);
            return dateA.getTime() - dateB.getTime();
          });

        const updatedDateList: SeriesData[] = dateList.map((day) => {
          const series = sortedOngoings.filter((item) => {
            const episodeDate = new Date(item.material_data.next_episode_at);
            return episodeDate.getDate() === day.date;
          });

          return {
            ...day,
            series,
          };
        });

        setDateList(updatedDateList);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };

    fetchOngoings();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={commonStyles.container}>
          <HeaderReleases />
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
                          <ReleaseItem seriesItem={seriesItem} />
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
