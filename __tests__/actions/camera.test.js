/* global fetch */
/* global describe */
/* global it */
/* global expect */
/* global console */
/* global process */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { savePhoto } from '../../app/actions/camera'
import { getMockPhoto } from '../test-utils'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('test save photo action', () => {
  it('should save and set the state', async () => {
    const store = mockStore({})
    const mockLocation = {
      coords: {
        accuracy: 5,
        altitude: 0,
        altitudeAccuracy: -1,
        heading: -1,
        latitude: 37.33233141,
        longitude: -122.0312186,
        speed: 0
      },
      timestamp: 1571221845199.04
    }
    await savePhoto('uri', mockLocation, 'test photo')(store.dispatch)
    const photo = getMockPhoto({
      'description': 'test photo'
    })
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SAVING_PHOTO',
      uri: 'uri'
    })
    expect(actions[1]).toEqual({
      type: 'SAVED_PHOTO',
      photo
    })
  })
})
