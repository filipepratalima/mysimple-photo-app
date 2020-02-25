import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useNavigation, 
  useIsFocused, 
  useFocusEffect
} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import {Snackbar, Title} from 'react-native-paper';
import CameraButton, {
  SIZE_BIG, 
  SIZE_SMALL, 
  ICON_CAMERA, 
  ICON_SWITCH_CAMERA
} from '../components/CameraButton';

import {GALLERY} from '../navigation/screens';

interface Props {

}

const cameras: any[] = [
  RNCamera.Constants.Type.back,
  RNCamera.Constants.Type.front,
];

let cameraNode: any;

const Camera: React.FC<Props> = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [cameraType, setCameraType] = useState(cameras[0]);
  const [notifySuccess, setNotifySuccess] = useState(false);

  useFocusEffect(React.useCallback(() => {
    if(isFocused) {
      navigation.setParams({
        overrideOnBackButtonPress: () => 
          navigation.navigate(GALLERY, { refresh: true })
      })
    }
  }, [isFocused]))

  async function shoot() {
    if(cameraNode) {
      const data = await cameraNode.takePictureAsync();
      await CameraRoll.saveToCameraRoll(data.uri);
      setNotifySuccess(true);
    }
  }

  return (
    <View style={styles.main}>
      <RNCamera
        ref={node => cameraNode = node}
        style={styles.camera}
        type={cameraType}
      />
      <View style={{
        opacity: notifySuccess ? 0 : 1,
        ...styles.cameraControls
        }}>
        <CameraButton 
          size={SIZE_BIG}
          type={ICON_CAMERA}
          onPress={() => shoot()}
        />
        <CameraButton 
          size={SIZE_SMALL}
          type={ICON_SWITCH_CAMERA}
          onPress={() => {
            setCameraType(cameraType === cameras[0] ? cameras[1] : cameras[0])
          }}
        />
      </View>
      <Snackbar
        style={styles.snackbar}
        visible={notifySuccess}
        onDismiss={() => setNotifySuccess(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        <Title style={styles.snackbarCopy}>
          Nice one, great photo! 😁👍
        </Title>
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 50
  },
  cameraControls: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 20,
    marginLeft: '32%',
    justifyContent: 'space-around'
  },
  snackbar: {
    backgroundColor: 'purple',
  },
  snackbarCopy: {
    color: 'white'
  }
})

export default Camera;
