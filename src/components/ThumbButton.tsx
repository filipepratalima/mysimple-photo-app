import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

interface Props {
  source: string;
  onPress: Function;
}

const ThumbButton: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);

  return (
    <TouchableOpacity 
      style={styles.main} 
      onPress={() => props.onPress(props.source)}
    >
      {loading && 
        <ActivityIndicator 
          style={styles.loader} 
          animating 
          size='small' 
        />}
      <Image
        source={{ uri: props.source }}
        style={styles.image}
        onLoadEnd={() => setLoading(false)}
        resizeMethod='resize'
        resizeMode='cover'
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: 120,
    height: 120,
    margin: 5,
    flexDirection: 'column',
  },
  loader: {
    flex: 1,
    alignSelf: 'center',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  }
})

export default ThumbButton;
