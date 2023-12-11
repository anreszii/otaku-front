import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { format, addDays } from "date-fns";
import HeaderReleases from "../components/Layouts/HeaderReleases";
import ContainerMain from "../components/Layouts/ContainerMain";
import Calendar from "../components/ui/Calendar";
import Loader from "../components/ui/Loader";
import Typography from "../components/ui/Typography";
import { getOngoingsList } from "../api/kodik/getOngoignsList";

interface SeriesData {
  date: number;
  dayOfWeek: string;
  focus: boolean;
  series?: OngoingData[];
}

interface OngoingData {
  material_data: {
    title: string;
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
  const [ongoings, setOngoings] = useState<OngoingData[]>([]);

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

        setOngoings(uniqueOngoings);
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
        <SafeAreaView>
          <HeaderReleases />
          <View style={{ marginTop: 72 }}>
            <Calendar dateList={dateList} setDateList={setDateList} />
          </View>
          <ContainerMain>
            <ScrollView
              style={{ height: Dimensions.get("window").height + 1000 }}
            >
              {dateList.map((item, index) => (
                <React.Fragment key={index}>
                  {item.focus && item.series && item.series.length > 0 ? (
                    <>
                      {console.log(item.series)}
                      {item.series.map((seriesItem) => (
                        <>
                          <Image
                            key={seriesItem.material_data.title}
                            source={{
                              uri:
                                seriesItem.material_data.screenshots?.[0] ||
                                seriesItem.screenshots?.[0],
                            }}
                            style={{ width: 300, height: 200 }}
                          />
                          <Typography>
                            {seriesItem.material_data.episodes_aired + 1}
                          </Typography>
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {item.focus &&
                        (!item.series || item.series.length === 0) && (
                          <View
                            style={{ width: "90%" }}
                            key={`no-schedule-${index}`}
                          >
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
                              No Release Schedule
                            </Typography>
                            <Typography
                              style={{
                                fontSize: 18,
                                fontWeight: "500",
                                lineHeight: 25.2,
                                letterSpacing: 0.2,
                                textAlign: "center",
                              }}
                              type="sub"
                            >
                              Sorry, there is no anime release schedule on this
                              date
                            </Typography>
                          </View>
                        )}
                    </>
                  )}
                </React.Fragment>
              ))}
            </ScrollView>
          </ContainerMain>
        </SafeAreaView>
      )}
    </>
  );
};

export default Releases;
