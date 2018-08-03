import zhTW from './zh_TW/index'
import zhCN from './zh_CN/index'
import en from './en/index'

export default {
  'zh_TW': zhTW,
  'zh_CN': zhCN,
  en,
  switch (lang) {
    let res = {}
    const classPrefix = "flag-icon-"

    switch(lang) {
      case 'zh-TW':
      case 'zh_TW':
        res = { langcode: 'zh_TW', classFlag: classPrefix + "tw" }
      break;
      case 'zh-CN':
      case 'zh_CN':
        res = { langcode: 'zh_CN', classFlag: classPrefix + "cn" }
      break;
      case 'en-US':
      case 'en':
        res = { langcode: 'en', classFlag: classPrefix + "us" }
      break;
      default:
        res = { langcode: lang, classFlag: classPrefix + "tw" }
      break;
    }
    return res
  }
}