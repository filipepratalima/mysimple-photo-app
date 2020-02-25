import React, { useState } from 'react';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { FAB } from 'react-native-paper';

import ThumbButton from '../components/ThumbButton';
import {PHOTO, CAMERA} from '../navigation/screens';

interface Props {

}

const Gallery: React.FC<Props> = props => {
  const [ refreshing, setRefreshing ] = useState(false);
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
    setRefreshing(true);
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
    setRefreshing(false);
  }

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={() => getPhotos()}
          />
        }
        style={styles.list}
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
      <FAB
        style={styles.fab}
        icon='camera'
        onPress={() => navigation.navigate(CAMERA)}
      />
    </>
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
  },
  fab: {
    position: 'absolute',
    marginRight: 20,
    marginBottom: 40,
    right: 0,
    bottom: 0
  }
})

export default Gallery;