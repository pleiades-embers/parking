import { getBaseUrl, getDefaultsConfig } from "../request/defaults";

export function getFrontAmapGeocodeRegeo(location) {
  return my.request({
    url: getBaseUrl() + "/MAGIC-DELIVERY/front/amap/geocode/regeo",
    method: "GET",
    data: {
      location,
    },
    dataType: "json",
    ...getDefaultsConfig(),
  });
}
