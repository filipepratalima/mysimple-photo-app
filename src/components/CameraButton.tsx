import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

interface Props {
  style?: any;
  size: number;
  type: string;
  onPress: () => {};
}

export const SIZE_BIG: number = 75;
export const SIZE_SMALL: number = 55;

export const ICON_CAMERA: string = 'camera';
export const ICON_SWITCH_CAMERA: string = 'autorenew';

const hitSlop = {
  top: 5,
  left: 5,
  bottom: 5,
  right: 5
}

const CameraButton: React.FC<Props> = (props) => {
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

export default CameraButton;
