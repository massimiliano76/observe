import CookieManager from 'react-native-cookies'

import { purgeCache as purgeCacheAction } from './map'
import { persistor } from '../utils/store'

export function purgeCache () {
  return async dispatch => {
    await dispatch(purgeCacheAction())

    console.warn('Cache purged.')
  }
}

export function purgeStore () {
  return async dispatch => {
    await persistor.purge()

    console.warn('Store purged.')
  }
}

export function purgeCookies () {
  return async dispatch => {
    dispatch({
      type: 'PURGING_COOKIES'
    })

    await CookieManager.clearAll()

    dispatch({
      type: 'PURGED_COOKIES'
    })
  }
}
