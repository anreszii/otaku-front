import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import {
  FFmpegKit,
  ReturnCode,
  FFmpegKitConfig,
  SessionState,
} from "ffmpeg-kit-react-native";

FFmpegKitConfig.disableLogs();

export const downloadAndSaveVideo = async (
  urlM3U8: string,
  fileNameMP4: string
) => {
  try {
    await FFmpegKit.executeAsync(
      `-i ${urlM3U8} -c copy ${FileSystem.documentDirectory + fileNameMP4}`,
      (session) => {
        return FileSystem.documentDirectory + fileNameMP4;
      }
    ).catch(() => {
      return "Ошибка сервера";
    });
  } catch (error) {
    console.error("Error while executing FFmpeg:", error);
  }
};
