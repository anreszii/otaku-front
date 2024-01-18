import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "./Typography";

interface CalendarProps {
  style?: object;
  dateList: any;
  setDateList: any;
}

const Calendar: React.FC<CalendarProps> = ({
  style,
  dateList,
  setDateList,
}) => {
  const [dateArray, setDateArray] = useState<any>(dateList || []);
  const changeFocus = (date: any) => {
    dateList[dateList.findIndex((el: any) => el.focus === true)].focus = false;
    dateList[dateList.findIndex((el: any) => el.date === date)].focus = true;
    dateArray[dateArray.findIndex((el: any) => el.focus === true)].focus =
      false;
    dateArray[dateArray.findIndex((el: any) => el.date === date)].focus = true;
    setDateArray([...dateArray]);
    setDateList([...dateList]);
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
      {dateArray.map((item: any, index: any) => (
        <View key={index}>
          {index === 0 ? (
            <>
              {item.focus ? (
                <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["#7210FF", "#9D59FF"]}
                  style={{
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: 12,
                    paddingLeft: 12,
                    borderRadius: 100,
                    width: 58,
                    marginRight: 16,
                    marginLeft: 24,
                    ...style,
                  }}
                >
                  <TouchableOpacity>
                    <View
                      style={{
                        margin: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography type="regular" style={styles.titleGradient}>
                        {item.dayOfWeek}
                      </Typography>
                      <Typography type="title" style={styles.titleGradient}>
                        {item.date}
                      </Typography>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <TouchableOpacity onPress={() => changeFocus(item.date)}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: 70,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingRight: 12,
                      paddingLeft: 12,
                      borderRadius: 100,
                      marginRight: 16,
                      marginLeft: 24,
                      width: 58,
                      borderWidth: 2,
                      borderColor: "#BDBDBD",
                      ...style,
                    }}
                  >
                    <Typography type="regular" style={styles.titleBasic}>
                      {item.dayOfWeek}
                    </Typography>
                    <Typography type="title" style={styles.titleBasic}>
                      {item.date}
                    </Typography>
                  </View>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <>
              {item.focus ? (
                <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["#7210FF", "#9D59FF"]}
                  style={{
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: 12,
                    paddingLeft: 12,
                    borderRadius: 100,
                    width: 58,
                    marginRight: 16,
                    ...style,
                  }}
                >
                  <TouchableOpacity>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography type="regular" style={styles.titleGradient}>
                        {item.dayOfWeek}
                      </Typography>
                      <Typography type="title" style={styles.titleGradient}>
                        {item.date}
                      </Typography>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <TouchableOpacity onPress={() => changeFocus(item.date)}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: 70,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingRight: 12,
                      paddingLeft: 12,
                      borderRadius: 100,
                      marginRight: 16,
                      width: 58,
                      borderWidth: 2,
                      borderColor: "#BDBDBD",
                      ...style,
                    }}
                  >
                    <Typography type="regular" style={styles.titleBasic}>
                      {item.dayOfWeek}
                    </Typography>
                    <Typography type="title" style={styles.titleBasic}>
                      {item.date}
                    </Typography>
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  titleGradient: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 19.6,
    letterSpacing: 0.2,
  },
  titleBasic: {
    color: "#BDBDBD",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 19.6,
    letterSpacing: 0.2,
  },
});
