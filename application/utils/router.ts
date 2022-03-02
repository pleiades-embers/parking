import {
  getCurrentInstance,
  navigateBack,
  getCurrentPages
} from "@tarojs/taro";
import { get } from "lodash-es";
import { Member } from "@/magic-sdk/types";
import { createUnique } from "@/application/utils";
import { StorageKey } from "@/application/storageKey";
import store, { dispatch } from "@/application/store";
import { getSubsites } from "@/magic-sdk";
import { createCoMallElement } from "@comall/work-in-progress";
import { changeSubsite } from "../store/subsite/effets";
import {
  appendElement,
  removeElement,
  updateElement
} from "../store/protocol/effects";

const needVerification = [
  "couponsCenter",
  "memberQRCode",
  "service.goodsCollection",
  "service.merchantCollection",
  "service.coupon",
  "service.address",
  "service.parking",
  "service.distribution",
  "creditShop"
];

const searchPages = ["productList", "search", "categoryProductList"];

const tabsName = ["store", "category", "memberCenter"];

export const namedToRouter = {
  topic: "/subpackages/coupons-center-new/index",
  merchant: "/subpackages/merchant/index",
  productDetail: "/subpackages/product-detail/index",
  productList: "/subpackages/search-result/index",
  products: "/subpackages/search-result/index",
  memberCenter: "/pages/member-center/index",
  store: "/pages/home/index",
  couponsCenter: "/subpackages/coupons-center-new/index",
  search: "/subpackages/search/index",
  category: "/pages/category/index",
  categoryProductList: "/subpackages/search-result/index",
  creditShop: "/subpackages/credit-shop/index",
  vipCard: "",
  service: {
    goodsCollection: "/subpackages/my-goods-collections/index",
    merchantCollection: "/subpackages/my-merchant-collections/index",
    coupon: "/subpackages/coupons-center/index",
    address: "/subpackages/my-address-book/index",
    parking: "/pages/parking-fee/index",
    distribution: "/subpackages/distribution/index",
    virtualOrder: "/subpackages/my-virtual-orders/index"
  }
};

export interface URLKeys {
  [key: string]: string | number;
}

export const searchStringify = (params: URLKeys): string => {
  let search = "";
  let count = 0;
  const keys = Object.keys(params);
  const total = keys.length;
  for (const key of keys) {
    count++;
    if (count === total) {
      search += `${key}=${params[key]}`;
      break;
    }
    search += `${key}=${params[key]}&`;
  }
  return search;
};

/**
 * 根据别名跳转路由
 * @param named 别名
 * @param params 写的参数
 */
export function navigateToNamed(named: string, params: URLKeys = {}): void {
  const member: Member | null = store.getState().member.entity;

  if (needVerification.includes(named) && !member) {
    /**
     * 这里 未登录  走领取会员卡
     */

    

    
  } else {
    const router = get(namedToRouter, named);
    if (router) {
      // 处理搜索入口判断
      if (searchPages.includes(named)) {
        const instance = getCurrentInstance();
        if (instance.router?.path === "/pages/platform/index") {
          $Storage.set(StorageKey.SearchMode, {
            platform: "true"
          });
        } else if (instance.router?.path === "/pages/home/index") {
          $Storage.set(StorageKey.SearchMode, {
            platform: "false"
          });
        } else if (instance.router?.path === "/subpackages/merchant/index") {
          const { params } = instance.router;
          if (params) {
            const { merchantId } = params;
            if (merchantId) {
              $Storage.set(StorageKey.SearchMode, {
                platform: "false",
                merchantId
              });
            }
          }
        } else {
          $Storage.set(StorageKey.SearchMode, { platform: "false" });
        }
      }
      const url = `${router}${
        params && Object.keys(params).length
          ? `?${searchStringify(params)}`
          : ""
      }`;
      if (tabsName.includes(named)) {
        if (named === "store") {
          try {
            getSubsites().then(res => {
              const subsites = res.data;
              const subsitesFilter = subsites.filter(
                subsite => subsite.id === Number(params.id)
              );
              // (subsitesFilter);
              dispatch(changeSubsite(subsitesFilter[0]));
              my.switchTab({ url });
            });
          } catch (error) {}
        }
        if (named === "category") {
          try {
            $Storage.set(StorageKey.Category, params);
            my.switchTab({ url });
          } catch (error) {}
        }
        my.switchTab({ url });
      } else {
        my.navigateTo({ url });
      }
    } else {
      if (named === "memberQRCode") {
        showMemberQRCode();
      }
    }
  }
}

function showMemberQRCode() {
  const currentRouter = getCurrentInstance().router;
  const key = createUnique();
  let scope: string;
  if (currentRouter) {
    scope = currentRouter.path;
    append();
    setTimeout(show, 100);
  }
  function onMemberQRCodeClose() {
    hide();
    setTimeout(remove, 100);
  }
  function hide() {
    if (scope) {
      dispatch(updateElement(scope, key, { isOpened: false }));
    }
  }
  function append() {
    const element = createCoMallElement("memberQRCode", {
      key,
      isOpened: false,
      onClose: onMemberQRCodeClose
    });
    dispatch(appendElement(scope, element));
  }
  function show() {
    if (scope) {
      dispatch(updateElement(scope, key, { isOpened: true }));
    }
  }
  function remove() {
    if (scope) {
      dispatch(removeElement(scope, key));
    }
  }
}

/**
 * 返回时携带参数
 * 传参的页面：backWithParam(num,params)
 * 接受的页面在 componentDidShow() 方法中接收，setState后需要手动刷新key
 * let pages = Taro.getCurrentPages();
 * let currPage = pages[pages.length - 1]; // 获取当前页面
 * this.setState({
 *   house_id: currPage.data.house_id,
 * })
 */
export const backWithParams = ({ num = 1, data }) => {
  const pages = getCurrentPages(); // 获取当前的页面栈
  const prevPage = pages[pages.length - (num + 1)]; //  获取上num个页面
  prevPage.setData(data);
  navigateBack({
    delta: num
  });
};
