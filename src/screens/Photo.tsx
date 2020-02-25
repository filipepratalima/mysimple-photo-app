import React from 'react';
import {Image, StyleSheet} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {
  useRoute, 
  useNavigation, 
  useIsFocused, 
  useFocusEffect
} from '@react-navigation/native';
import {GALLERY} from '../navigation/screens';

interface Props {

}

type Photo = {
  timestamp: number;
  image: {
    uri: string;
  }
}

const Photo: React.FC<Props> = props => {
  const route: any = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  
  const photo: Photo = route.params.photo;

  async function deletePhoto(uri) {
    try {
      await CameraRoll.deletePhotos([uri]);
      navigation.navigate(GALLERY, { refresh: true });
    } catch(e) {
      console.log(e);
    }
  }

  useFocusEffect(React.useCallback(() => {
    if(isFocused) {
      navigation.setParams({
        subtitle: `${new Date(photo.timestamp * 1000).toDateString()}`,
        showDeleteButton: true,
        onDeleteButtonPress: () => deletePhoto(photo.image.uri)
      })
    }
  }, [isFocused]))

  return (
    <Image 
      style={styles.image}
      source={{uri: photo.image.uri}}
      resizeMethod='auto'
      resizeMode='contain'
    />
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})

export default Photo;
