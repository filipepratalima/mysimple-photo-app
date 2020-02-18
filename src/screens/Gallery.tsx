import React, { useState } from 'react';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StyleSheet, FlatList } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import ThumbButton from '../components/ThumbButton';

import {PHOTO} from '../navigation/screens';

interface Props {

}

// let photosPageInfo: any;

const Gallery: React.FC<Props> = (props) => {
  const [ photos, setPhotos ] = useState([]);
  const [ photosPageInfo, setPhotosPageInfo ] = useState();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if(isFocused) {
        getPhotos();
      }
    }, [isFocused])
  );

  const getPhotos = async () => {
    try {
      const data = await CameraRoll.getPhotos({
        first: 50,
        assetType: 'Photos',
        after: photosPageInfo?.end_cursor
      });
      setPhotosPageInfo(data.page_info);
      const newList = photos.length ? photos.concat(data.edges) : data.edges;
      setPhotos(newList);
      data.edges.map(item => console.log(`got: ${item.node.image.uri}`));
    } catch(e) {
      console.log(JSON.stringify(e, null, 4));
    };
  }

  return (
    <FlatList style={styles.list}
      contentContainerStyle={styles.listContent}
      numColumns={3}
      data={photos}
      renderItem={({item}) =>
        <ThumbButton
          source={ item.node.image.uri }
          onPress={source => navigation.navigate(PHOTO, { source })}
        />
      }
      keyExtractor={(item, i) => `key${i}`}
      onEndReachedThreshold={0.5}
      onEndReached={() => getPhotos()}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 5
  },
  listContent: {
    flex: 1
  }
})

export default Gallery;