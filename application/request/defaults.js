// import { isPlainObject, isObject } from "/node_modules/lodash-es";
import { createUnique } from "../utils/general";
import { StorageKey } from "../storageKey";

export function getDefaultsConfig() {
  const member = my.getStorageSync({ key: StorageKey.Member }).data;
  if (!member) {
    my.setStorageSync({ key: StorageKey.Unique, data: createUnique() });
  }
  const unique = my.getStorageSync({ key: StorageKey.Unique }).data;
  return {
    headers: {
      apiVersion: "1",
      "Accept-language": "zh-CN",
      language: "zh-CN",
      "Content-Type": "application/json;charset=utf-8",
      os: "ALIPAY",
      channel: 7,
      unique: unique,
      osVersion: my.getSystemInfoSync().version
    },
    timeout: 30000,
    responseType: "json",
    // transformRequest(data) {
    //   return isPlainObject(data) || !isObject(data)
    //     ? JSON.stringify(data)
    //     : data;
    // }
  };
}

export function getBaseUrl() {
  return my.getExtConfigSync().domain;
}

export function getMember() {
  const member = getApp().globalData.member;
  return {
    userId: member.id,
    userSession: member.userSession,
    openId: member.openId
  };
}
