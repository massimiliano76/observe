import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import ConfirmDialog from './ConfirmDialog'
import ObserveIcon from './ObserveIcon'
import { colors } from '../style/variables'
import getDefaultPreset from '../utils/get-default-preset'
import getPresetByTags from '../utils/get-preset-by-tags'

const Header = styled.View`
  padding-top: 16;
  padding-right: 16;
  padding-bottom: 16;
  padding-left: 16;
  flex-direction: row;
  background-color: white;
`

const PresetName = styled.Text`
  font-weight: 500;
  margin-top: 4;
`

const IconWrapper = styled.TouchableOpacity`
  width: 48;
  height: 48;
  margin-right: 8;
  justify-content: center;
  align-items: center;
`

const Button = styled.TouchableHighlight``

const Coordinates = styled.Text`
  color: ${colors.baseMuted};
  font-size: 14;
  padding-right: 4;
`

const Edit = styled.Text`
  color: ${colors.primary};
  font-size: 14;
`

export default class FeatureDetailHeader extends React.Component {
  state = {
    dialogVisible: false
  }

  render () {
    const { feature, navigation } = this.props
    let { preset } = this.props
    if (!feature) return null

    if (!preset) {
      preset = getPresetByTags(feature.properties) || getDefaultPreset(feature.geometry.type)
    }

    const geometryType = feature.geometry.type
    const coordinates = feature.geometry.coordinates

    const cancelDialog = () => {
      this.setState({ dialogVisible: false })
    }

    const changePreset = () => {
      cancelDialog()
      navigation.navigate('SelectFeatureType', { feature })
    }

    const icon = (preset.icon || feature.properties.icon || 'maki_marker').replace(/-/g, '_')

    return (
      <>
        <Header>
          {
            (
              <IconWrapper onPress={() => {
                if (preset) {
                  this.setState({ dialogVisible: true })
                }
              }}>
                <ObserveIcon
                  name={icon}
                  size={36}
                  color={colors.primary}
                />
              </IconWrapper>
            )
          }
          <View>
            <PresetName>{preset.name}</PresetName>
            {
              geometryType === 'Point' && (
                <Button
                  onPress={() => {
                    navigation.navigate('Explore', { feature, mode: 'edit' })
                  }}
                >
                  <Coordinates>
                    {coordinates[0].toFixed(3)}, {coordinates[1].toFixed(3)}
                    <Edit> Edit coordinates</Edit>
                  </Coordinates>
                </Button>
              )
            }
          </View>
        </Header>
        <ConfirmDialog visible={this.state.dialogVisible} cancel={cancelDialog} continue={changePreset} />
      </>
    )
  }
}
