import { SubSite } from '@/magic-sdk/types';
import { getLocation } from '@tarojs/taro';


const RADIUS_OF_EARTH = 6378245.0;


export function getDistance(la1, lo1, la2, lo2) {
  const La1 = (la1 * Math.PI) / 180.0;
  const La2 = (la2 * Math.PI) / 180.0;
  const La3 = La1 - La2;
  const Lb3 = (lo1 * Math.PI) / 180.0 - (lo2 * Math.PI) / 180.0;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(La3 / 2), 2) +
          Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)
      )
    );
  s = (s * RADIUS_OF_EARTH) / 1000;
  s = Math.round(s * 10000) / 10000;
  return s;
}




export async function getClosestSubSite(
  subSites: SubSite[]
): Promise<SubSite | undefined> {
  if (!Array.isArray(subSites)) {
    return undefined;
  }
  try {
    const { latitude, longitude } = await getLocation({ type: 'gcj02' });
    let lastDistance = Number.POSITIVE_INFINITY,
      closestSubsite: any;
    for (const item of subSites) {
      const distance = getDistance(
        latitude,
        longitude,
        item.latitude,
        item.longitude
      );

      if (lastDistance > distance) {
        lastDistance = distance;
        closestSubsite = item;
      }
    }
    return closestSubsite;
  } catch (error) {
    return subSites[0];
  }
}
