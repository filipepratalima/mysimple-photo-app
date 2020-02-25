import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Headline, Title, Paragraph} from 'react-native-paper';

import IconButton, {
  SIZE_BIGGEST,
  ICON_PHOTO_GALLERY, 
  ICON_PHOTO_CAMERA
} from '../components/IconButton';
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
      <View style={styles.buttons}>
        <IconButton
          style={styles.button}
          size={SIZE_BIGGEST}
          type={ICON_PHOTO_GALLERY}
          onPress={() => navigation.navigate(GALLERY)}
        />
        <IconButton
          style={styles.button}
          size={SIZE_BIGGEST}
          type={ICON_PHOTO_CAMERA}
          onPress={() => navigation.navigate(CAMERA)}
        />
      </View>
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
  },
  buttons: {
    paddingVertical: 40,
    justifyContent: 'space-between'
  },
  button: {
    margin: 20,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'black'
  }
})

// Home.navigationOptions = {
//   header: () => {}
// }

export default Home;
