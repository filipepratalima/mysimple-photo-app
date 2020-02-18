import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';
import {IconButton, Headline, Title, Paragraph, Button} from 'react-native-paper';

import {GALLERY, CAMERA} from '../navigation/screens';

interface Props {
}

const Home: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <Headline>My Simple Photo App</Headline>
      <View style={styles.description}>
        <Title>Welcome,</Title>
        <Paragraph>Please select from the options below</Paragraph>
      </View>
      <IconButton 
        icon="folder-multiple-image"
        size={80}
        onPress={() => navigation.navigate(GALLERY)}
      />
      <IconButton 
        icon="camera-outline" 
        size={80}
        onPress={() => navigation.navigate(CAMERA)}
      />
      {/* <Button 
        icon=""
        mode="contained" 
        onPress={() => navigation.navigate(GALLERY)}
      >
        Photo Gallery
      </Button>
      <Button 
        icon="camera" 
        mode="contained" 
        onPress={() => {navigation.navigate(CAMERA)}}
      >
        Camera
      </Button> */}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center'
  },
  description: {
    paddingVertical: 40,
  }
})

// Home.navigationOptions = {
//   header: () => {}
// }

export default Home;
