import defaultSettings from '@/settings'

const title = defaultSettings.title || '巡检系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
