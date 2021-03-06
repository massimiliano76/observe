import * as types from '../actions/actionTypes'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

async function startTrace (dispatch) {
  dispatch({
    type: types.TRACE_START
  })
  let { status } = await Permissions.askAsync(Permissions.LOCATION)
  if (status !== 'granted') {
    // TODO: show error message
  }
  const watcher = await Location.watchPositionAsync({
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval: 1000, // TODO: get from config
    distanceInterval: 5 // TODO: get from config
  }, location => {
    dispatch({
      type: types.TRACE_POINT_CAPTURED,
      location
    })
  })
  dispatch({
    type: types.TRACE_SET_SUBSCRIPTION,
    watcher
  })
}

async function endTrace (dispatch, watcher, description) {
  if (watcher) watcher.remove()
  dispatch({
    type: types.TRACE_END,
    description
  })
}

export default {
  startTrace,
  endTrace
}
