import axios from "axios";
import qs from "qs";
import logger from "../helpers/logger";
import { HttpsProxyAgent } from "https-proxy-agent";
import {  EStatus, IFacebookDocument } from "../typing/typing";
import Proxy from "../models/Proxy";
import Facebook from "../models/Facebook";
import FormData from "form-data";

const encodeUrlVip = (url: string) => {
  const query = qs.parse(url);
  const newQuery: {
    [key: string]: string;
  } = {};
  for(const key in query) {
    newQuery[key] = query[key].toString();
  }
  return newQuery;
}
const explodeBy = (begin: string, end: string, data: string) => {
  try {
    let result = data.split(begin);
    result = result[1].split(end);
    return result[0];
  } catch (ex) {
    return "";
  }
}
const decodeHTMLEntities = (text: string) => {
  var entities = [
    ['amp', '&'],
    ['apos', '\''],
    ['#x27', '\''],
    ['#x2F', '/'],
    ['#39', '\''],
    ['#47', '/'],
    ['lt', '<'],
    ['gt', '>'],
    ['nbsp', ' '],
    ['quot', '"']
  ]
  for (var i = 0, max = entities.length; i < max; ++i) text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
  return text;
}
const removeEntities = (str: string) => {
  str = decodeHTMLEntities(str);
  str = unescape(str);
  return str;
}
// convert December 25, 1994 to 25/12/1994
export const convertBirthday = (birthday: string) => {
  const regex = /([A-Z][a-z]+) ([0-9]{1,2}), ([0-9]{4})/gmi;
  const match = regex.exec(birthday);
  if (match) {
    const day = match[2];
    const month: keyof typeof months = match[1] as keyof typeof months;
    const year = match[3];
    const months = {
      'January': '01',
      'February': '02',
      'March': '03',
      'April': '04',
      'May': '05',
      'June': '06',
      'July': '07',
      'August': '08',
      'September': '09',
      'October': '10',
      'November': '11',
      'December': '12',
    };
    return `${day}/${months[month]}/${year}`;
  }
  return ''; // Add a default return value for the case when there is no match
};

export const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const generateRegex = (find: string) => {
  return new RegExp(escapeRegExp(find), "gmi");
}
// covert base64 to string
export const base64ToString = (base64: string) => {
  return Buffer.from(base64, 'base64').toString('ascii');
}

export const createFacebook = async (name: string, facebookId: string, birth?: string) => {
  const covertId = base64ToString(facebookId).split(':').pop();
  const facebook = await Facebook.findOne({ facebookId: covertId });
  if (!facebook) {
    const newFacebook = await Facebook.create({
      name,
      facebookId: covertId,
      birth
    });
    await newFacebook.save();
  }
};

export const scanBirthdayById = async(id: string, agent: any, cookie: string) => {
  try {
    const responseLanguage = await axios({
      method: "GET",
      url: `https://mbasic.facebook.com/language`,
      headers: {
        'authority': 'mbasic.facebook.com',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': "en-US,en;q=0.9",
        'cache-control': 'max-age=0',
        'cookie': `${cookie}`,
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
      httpAgent: agent,
      httpsAgent: agent
    });
    const html = responseLanguage.data;
    const form = explodeBy('<form method="post" action="/intl/save_locale/?loc=en_US', '</form>', html);
    const action = `loc=en_US${form.split('"')[0]}`;
    const fb_dtsg = encodeURIComponent(explodeBy('name="fb_dtsg" value="', '"', form));
    const jazoest = explodeBy('name="jazoest" value="', '"', form);
    console.log({
      fb_dtsg,
      jazoest,
      url: `https://mbasic.facebook.com/intl/save_locale/?${qs.stringify(encodeUrlVip(removeEntities(action)))}`,
    });
    if (action) {
      const responseLanguage2 = await axios({
        method: "POST",
        url: `https://mbasic.facebook.com/intl/save_locale/?${qs.stringify(encodeUrlVip(removeEntities(action)))}`,
        headers: {
          'authority': 'mbasic.facebook.com', 
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
          'accept-language': 'en-US,en;q=0.9', 
          'cache-control': 'max-age=0', 
          'content-type': 'application/x-www-form-urlencoded', 
          'cookie': cookie, 
          'origin': 'https://mbasic.facebook.com', 
          'referer': 'https://mbasic.facebook.com/language', 
          'sec-ch-prefers-color-scheme': 'light', 
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"', 
          'sec-ch-ua-full-version-list': '"Not.A/Brand";v="8.0.0.0", "Chromium";v="114.0.5735.199", "Google Chrome";v="114.0.5735.199"', 
          'sec-ch-ua-mobile': '?0', 
          'sec-ch-ua-platform': '"Windows"', 
          'sec-ch-ua-platform-version': '"10.0.0"', 
          'sec-fetch-dest': 'document', 
          'sec-fetch-mode': 'navigate', 
          'sec-fetch-site': 'same-origin', 
          'sec-fetch-user': '?1', 
          'upgrade-insecure-requests': '1', 
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', 
          'viewport-width': '616'
        },
        httpAgent: agent,
        httpsAgent: agent,
        data: {
          fb_dtsg,
          jazoest,
        }
      });
      console.log(responseLanguage2.data);
      // if (responseLanguage2.data) {
      //   const response = await axios({
      //     method: "GET",
      //     url: `https://mbasic.facebook.com/${id}/about`,
      //     headers: {
      //       'authority': 'mbasic.facebook.com',
      //       'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      //       'accept-language': "en-US,en;q=0.9",
      //       'cache-control': 'max-age=0',
      //       'cookie': `${cookie}`,
      //       'sec-fetch-dest': 'document',
      //       'sec-fetch-mode': 'navigate',
      //       'sec-fetch-site': 'none',
      //       'sec-fetch-user': '?1',
      //       'upgrade-insecure-requests': '1',
      //     },
      //     httpAgent: agent
      //   });
      //   const data = response.data;
      //   console.log(data);
      //   const $ = cheerio.load(data);
      //   const birthday = $('#basic-info > div > div > div:nth-child(1) > table').text().split('Birthday')[1];
      //   if (birthday !== '') {
      //     const birth = convertBirthday(birthday);
      //     logger.debug(`Birthday: ${birth}`);
      //     return birth;
      //   } 
      // }
    }
    return '';
  } catch (error) {
    throw new Error(error);
  }
};

export const getInfo = async( id: string, cursor: string = '', cookie: string) => {
  try {
    const proxy = await Proxy.findOne({ status: true });
    if (proxy) {
      const ip = proxy?.ip?.trim();
      const port = proxy?.port;
      const protocol = 'http';
      const username = proxy?.username.trim();
      const password = proxy?.password.trim();
      const agent = new HttpsProxyAgent(`${protocol}://${username}:${password}@${ip}:${port}`);
      const rawId = `app_collection:${id}:2356318349:2`;
      const response = await axios({
        method: "POST",
        url: "https://www.facebook.com/api/graphql",
        data: qs.stringify({
          '__a': '1',
          '__comet_req': '15',
          'variables': `{"count":8,"cursor": "${cursor}","scale":1,"id":"${Buffer.from(rawId).toString("base64")}"}`,
          'server_timestamps': 'true',
          'doc_id': '5633912679952121' 
        }),
        headers: {
          "Sec-Fetch-Site": "same-origin",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        httpAgent: agent,
        httpsAgent: agent
      });
      const birth = await scanBirthdayById(id, agent, cookie);
      const json = response.data;
      if (json.errors === "Rate limit exceeded") {
        proxy.status = false;
        await proxy.save();
        logger.error(json.errors[0]?.message);
        throw new Error(json.errors[0]?.message);
      }
        const data = response.data.data;
        const info = data.node?.pageItems;
        return {
          info,
          birth,
        };
      }
  } catch(ex) {
    throw ex;
  }
}

export const scanUid = async(uid: string, cookie: string) => {
  try {
    let infoApi = await getInfo(uid, '', cookie);
    let info = infoApi.info;
    let birth = infoApi.birth;
    while(info !== null && info.edges?.length > 0) {
      const endCursor = info?.page_info?.end_cursor;
      logger.info('endCursor', endCursor);
      infoApi = await getInfo(uid, endCursor, cookie);
      info = infoApi.info;
      birth = infoApi.birth;
      for(const item of info?.edges) {
        await createFacebook(item.node?.title?.text, item.node?.id, birth);
      }
      logger.log('===================================================');
    }
    logger.success(`Scan uid ${uid} completed`);
    await Facebook.findOneAndUpdate({ facebookId: uid }, { status: EStatus.SUSSESS });
  } catch(ex) {
    console.log(ex);
    logger.error(`Scan uid ${uid} failed`, ex.message);
    await Facebook.findOneAndUpdate({ facebookId: uid }, { status: EStatus.ERROR });
  }
}

export const scanAll = async(cookie: string) => {
  const facebooks = await Facebook.find<IFacebookDocument>({ status: EStatus.PENDING });
    while(facebooks && facebooks.length > 0) {
      const facebook = await Facebook.findOne<IFacebookDocument>({ status: EStatus.PENDING });
      try {
        facebook.status = EStatus.PROCESSING;
        const newFacebook = await facebook.save();
        await scanUid(newFacebook.facebookId, cookie);
        newFacebook.status = EStatus.SUSSESS; 
        await newFacebook.save();
        logger.success(`Scan uid ${newFacebook.facebookId} completed`);
      } catch (error) {
        facebook.status = EStatus.ERROR;
        await facebook.save();
        logger.error(`Scan uid ${facebooks[0].facebookId} failed`, error.message);
    } 
  }
};