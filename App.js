import React, { Component } from 'react'

// NOTE: Comment out following lines to enable `why-did-you-render`

// if (process.env.NODE_ENV === 'dev') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   whyDidYouRender(React);
// }

import Config from 'react-native-config'
import { Provider } from 'react-redux'

import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'

import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './app/utils/store'
import Explore from './app/screens/Explore'
import Account from './app/screens/Account'
import Settings from './app/screens/Settings'
import OfflineAreaList from './app/screens/OfflineMaps/OfflineAreaList'
import ViewOfflineAreaDetail from './app/screens/OfflineMaps/ViewOfflineAreaDetail'
import UserContributionsListScreen from './app/screens/UserContributions/UserContributionsListScreen'
import UserContributionsItemScreen from './app/screens/UserContributions/UserContributionsItemScreen'
import ViewFeatureDetail from './app/screens/Features/ViewFeatureDetail'
import AddFeatureDetail from './app/screens/Features/AddFeatureDetail'
import EditFeatureDetail from './app/screens/Features/EditFeatureDetail'
import SelectFeatureType from './app/screens/Features/SelectFeatureType'
import PhotosListScreen from './app/screens/Photos/PhotosListScreen'
import PhotoDetailScreen from './app/screens/Photos/PhotoDetailScreen'
import TracesListScreen from './app/screens/Traces/TracesListScreen'
import TraceDetailScreen from './app/screens/Traces/TraceDetailScreen'

import AuthorizationManager from './app/components/AuthorizationManager'
import Drawer from './app/components/Drawer'
import Notification from './app/components/Notification'
import UploadManager from './app/components/UploadManager'
import ObserveAPIAuthManager from './app/components/ObserveAPIAuthManager'
import CameraScreen from './app/screens/CameraScreen'
import SaveTrace from './app/screens/SaveTrace'

import { ReduxNetworkProvider } from 'react-native-offline'
import Icon from './app/components/Collecticons'
import { colors } from './app/style/variables'

const OfflineMapsNavigator = createStackNavigator({
  OfflineAreaList: { screen: OfflineAreaList },
  ViewOfflineAreaDetail: { screen: ViewOfflineAreaDetail }
}, {
  initialRouteName: 'OfflineAreaList',
  headerMode: 'none',
  navigationOptions: {
    title: 'Offline Maps',
    drawerIcon: () => (
      <Icon
        name='map'
        style={{ fontSize: 16, color: colors.primary }}
      />
    )
  }
})

const UserContributionsNavigator = createStackNavigator({
  UserContributions: { screen: UserContributionsListScreen },
  UserContributionsDetail: { screen: UserContributionsItemScreen }
}, {
  initialRouteName: 'UserContributions',
  headerMode: 'none',
  navigationOptions: {
    title: 'Your Contributions',
    drawerIcon: () => (
      <Icon
        name='marker'
        style={{ fontSize: 16, color: colors.primary }}
      />
    )
  }
})

const PhotosListNavigator = createStackNavigator({
  PhotosListScreen: { screen: PhotosListScreen }
}, {
  initialRouteName: 'PhotosListScreen',
  headerMode: 'none',
  navigationOptions: {
    title: 'Your Photos',
    drawerIcon: () => (
      <Icon
        name='picture'
        style={{ fontSize: 16, color: colors.primary }}
      />
    )
  }
})

const TracesListNavigator = createStackNavigator({
  TracesListScreen: { screen: TracesListScreen }
}, {
  initialRouteName: 'TracesListScreen',
  headerMode: 'none',
  navigationOptions: {
    title: 'Your Traces',
    drawerIcon: () => (
      <Icon
        name='road'
        style={{ fontSize: 16, color: colors.primary }}
      />
    )
  }
})

// This is convenient when iterating on screens, as the active screen will
// reload when code changes. However, it breaks some uses of react-navigation
// params, so it's disabled by default
// const persistenceKey = __DEV__ ? 'NavigationStateDEV' : null
const persistenceKey = null
console.disableYellowBox = true

const AppNavigator = createDrawerNavigator({
  Explore: { screen: Explore },
  UserContributions: {
    screen: UserContributionsNavigator
  },
  OfflineMaps: { screen: OfflineMapsNavigator },
  PhotosListScreen: { screen: PhotosListNavigator },
  TracesListScreen: { screen: TracesListNavigator },
  Account: { screen: Account },
  Settings: { screen: Settings },
  ViewFeatureDetail: { screen: ViewFeatureDetail },
  AddFeatureDetail: { screen: AddFeatureDetail },
  EditFeatureDetail: { screen: EditFeatureDetail },
  SelectFeatureType: { screen: SelectFeatureType },
  PhotoDetailScreen: { screen: PhotoDetailScreen },
  CameraScreen: { screen: CameraScreen },
  SaveTrace: { screen: SaveTrace },
  TraceDetailScreen: { screen: TraceDetailScreen }
}, {
  initialRouteName: 'Explore',
  contentComponent: Drawer,
  contentOptions: {
    activeTintColor: colors.primary,
    activeBackgroundColor: 'rgb(237, 239, 254)',
    activeFontWeight: '600',
    labelStyle: {
      fontSize: 16,
      fontWeight: '400',
      letterSpacing: 0.5,
      marginLeft: 0,
      marginTop: 12,
      marginBottom: 12
    },
    itemsContainerStyle: {
      padding: 8,
      paddingTop: 16
    },
    itemStyle: {
      borderRadius: 4,
      borderColor: 'white',
      borderWidth: 1
    },
    iconContainerStyle: {
      opacity: 1,
      marginRight: 20,
      paddingRight: 0,
      marginLeft: 12,
      paddingLeft: 0
    }
  }
})

const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ReduxNetworkProvider pingServerUrl={Config.API_URL}>
            <AppContainer persistenceKey={persistenceKey} />
            <Notification />
            <AuthorizationManager />
            <ObserveAPIAuthManager />
            <UploadManager />
          </ReduxNetworkProvider>
        </PersistGate>
      </Provider>
    )
  }
}
