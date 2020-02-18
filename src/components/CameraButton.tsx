import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

interface Props {
  style: any;
  size: Number;
  type: string;
  onPress: Function;
}

export const SIZE_BIG: Number = 75;
export const SIZE_SMALL: Number = 55;

export const TYPE_CAMERA: string = 'camera';
export const TYPE_SWITCH_CAMERA: string = 'autorenew';

const hitSlop = {
  top: 5,
  left: 5,
  bottom: 5,
  right: 5
}

const CameraButton: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity 
      style={styles.main}
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
