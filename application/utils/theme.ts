import store from '../store';

let theme;

const CDN_DOMAIN = 'https://b-puzhehei-cdn.co-mall.net';

export function getImageUrlByTheme(name: string) {
  if (!theme) {
    theme = store.getState().tenant.entity?.theme;
  }
  return `${CDN_DOMAIN}/${theme}/${name}`;
}

export function getImageUrlByGlobal(name: string) {
  return `${CDN_DOMAIN}/global/${name}`;
}


