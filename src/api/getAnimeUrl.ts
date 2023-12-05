import axios from "axios";
import { sha256 } from "js-sha256";

export const getAnimeUrl = async (link: any) => {
  const getDataFormate = () => {
    const time = new Date();
    time.setHours(time.getHours() + 6);
    const YYYY = time.getFullYear();
    const MM =
      String(time.getMonth()).length === 1
        ? `0${Number(time.getMonth()) + 1}`
        : `${Number(time.getMonth()) + 1}`;
    const DD =
      String(time.getDate()).length === 1
        ? `0${time.getDate()}`
        : `${time.getDate()}`;

    const HH =
      String(time.getHours()).length === 1
        ? `0${time.getHours()}`
        : `${time.getHours()}`;
    return `${YYYY}${MM}${DD}${HH}`;
  };

  const timeAlive = String(getDataFormate());
  const reqSign = sha256.hmac(
    "7e58b622e5abefa805e1958f9f375039",
    `${link}:1.1.1.1:${timeAlive}`
  );

  console.log(timeAlive, link, reqSign);

  return axios.get("http://kodik.biz/api/video-links", {
    params: {
      link: link,
      p: "af1f9932e98b5d0615e90afe015ee23e",
      ip: "1.1.1.1",
      d: timeAlive,
      s: reqSign,
    },
  });
};
