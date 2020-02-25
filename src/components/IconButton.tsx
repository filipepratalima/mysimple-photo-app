import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

interface Props {
  style?: any;
  size: Number;
  type: string;
  onPress: Function;
}

export const SIZE_BIGGEST: Number = 120;
export const SIZE_BIG: Number = 75;
export const SIZE_SMALL: Number = 55;

export const ICON_CAMERA: string = 'camera';
export const ICON_SWITCH_CAMERA: string = 'autorenew';
export const ICON_PHOTO_GALLERY: string = 'folder-multiple-image';
export const ICON_PHOTO_CAMERA: string = 'camera-outline';

const hitSlop = {
  top: 5,
  left: 5,
  bottom: 5,
  right: 5
}

const IconButton: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity 
      style={{
        ...styles.main,
        ...props.style
      }}
      onPress={props.onPress}
      {...hitSlop}
    >
      <Avatar.Icon 
        size={props.size}
        icon={props.type}
        color="white"
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  main: {
    margin: 5
  }
})

export default IconButton;
