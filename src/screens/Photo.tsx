import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

interface Props {
}

const Photo: React.FC<Props> = (props) => {
  const route: any = useRoute();
  return (
    <Image 
      style={styles.image}
      source={{uri: route.params.source}}
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
