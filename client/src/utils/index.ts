import { useEffect, useState } from "react";
import { WIDTH_VNC_PERCENT } from "@configs/index";
import { FilterState, OptionState } from "@typings/datatable";
export const getUrl = (key: string): string => {
  let pathInfo = key.split("_");
  pathInfo = pathInfo.filter((item) => {
    return item != "item";
  });
  return pathInfo.join("/");
};
export const formatSize = (fileSize: number) => {
  if (fileSize === 0 || fileSize === undefined || fileSize === null) {
    return "Unknown";
  } else {
    const i = Math.floor(Math.log(fileSize) / Math.log(1024));
    const size = ((fileSize / Math.pow(1024, i)) * 1).toFixed(2);
    return `${size} ${["B", "kB", "MB", "GB", "TB"][i]}`;
  }
};
export const convertFilter = (array: OptionState): FilterState => {
  return array.map((item) => {
    return {
      text: item.label,
      value: item.value,
    };
  });
};
export const numberFormat = (
  num?: string | number,
  prefix?: string
): string => {
  try {
    if (num) {
      num = (num + "").replace(/[^0-9+\-Ee.]/g, "");
      const n = !isFinite(+num) ? 0 : +num;
      const prec = 6;
      const sep = ",";
      const dec = ".";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let s: any = "";
      const toFixedFix = (ns, precs) => {
        if (("" + ns).indexOf("e") === -1) {
          const vls = ns + "e+" + precs;
          return +(Math.round(Number(vls)) + "e-" + prec);
        } else {
          const arr = ("" + n).split("e");
          let sig = "";
          if (+arr[1] + precs > 0) {
            sig = "+";
          }
          const vlss = +arr[0] + "e" + sig + (+arr[1] + precs);
          const vlsss = +Math.round(Number(vlss)) + "e-" + precs;
          return Number(vlsss).toFixed(precs);
        }
      };
      s = (prec ? toFixedFix(n, prec).toString() : "" + Math.round(n)).split(
        "."
      );
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      let result = s.join(dec);
      if (prefix) result = prefix + result;
      return result;
    } else {
      return "0";
    }
  } catch (ex) {
    return "0";
  }
};
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const removeHtml = (str: string) => {
  return str.replace(/<(?:.|\n)*?>/gm, "");
};
export const cutString = (str: string, length: number) => {
  str = str.replace(/"/gm, "'").trim();
  str = removeHtml(str);
  if (str.length < length) return str;
  else {
    str = str.substring(0, length) + " ...";
    return str;
  }
};
export const getTimezoneOffset = (timeZone: string) => {
  const now = new Date();
  const tzString = now.toLocaleString("en-US", { timeZone });
  const localString = now.toLocaleString("en-US");
  const diff = (Date.parse(localString) - Date.parse(tzString)) / 3600000;
  let offset = diff + now.getTimezoneOffset() / 60;
  offset = -offset;

  const hours = Math.floor(offset);
  const minutes = Math.round((offset - hours) * 60);
  return `${offset < 0 ? "-" : "+"}${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`.replace(
    /--/gm,
    "-"
  );
};
export const getUrlFlag = (country: string) => {
  return `/flags/${country}.svg`;
};
/**
 * Hàm viết hoa chữ cái đầu tiên
 * @param str Chữ cần viết hoa chữ cái đầu
 * @returns string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const calcSize = (): {
  width: number;
  height: number;
} => {
  const width =
    (window.innerWidth / 100) * WIDTH_VNC_PERCENT > 1920
      ? 1600
      : (window.innerWidth / 100) * WIDTH_VNC_PERCENT;
  const height = (width * 1080) / 1920;
  return {
    width,
    height,
  };
};
export const groupBy = <T extends Record<string, never>>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((result: Record<string, T[]>, currentValue: T) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};
export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debounceValue;
};
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatSizeGb = (fileSize: number) => {
  if (fileSize === 0 || fileSize === undefined || fileSize === null) {
    return "Unknown";
  } else {
    const i = Math.floor(Math.log(fileSize) / Math.log(1024));
    const size = ((fileSize / Math.pow(1024, i)) * 1).toFixed(2);
    return `${size} ${["B", "kB", "MB", "GB", "TB"][i]}`;
  }
};
