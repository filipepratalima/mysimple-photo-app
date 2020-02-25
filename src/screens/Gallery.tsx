import React, { useState } from 'react';
import { 
  useFocusEffect, 
  useIsFocused, 
  useNavigation, 
  useRoute
} from '@react-navigation/native';
import { StyleSheet, FlatList } from 'react-native';
import CameraRoll, { GetPhotosParams } from '@react-native-community/cameraroll';
import { FAB } from 'react-native-paper';

import ThumbButton from '../components/ThumbButton';
import {PHOTO, CAMERA} from '../navigation/screens';

interface Props {

}

const Gallery: React.FC<Props> = props => {
  const [ photos, setPhotos ] = useState([]);
  const [ photosPageInfo, setPhotosPageInfo ] = useState();
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if(isFocused) {
        navigation.setParams({
          subtitle: 'All Photos'
        });
        getPhotos(route.params?.refresh);
      }
    }, [isFocused])
  );

  async function getPhotos(refresh: boolean = false) {
    if(photosPageInfo && !photosPageInfo.has_next_page) return;

    try {
      const options: GetPhotosParams = {
        first: 50,
        assetType: 'Photos'
      }
      if (!refresh) options.after = photosPageInfo?.end_cursor;
      const data = await CameraRoll.getPhotos(options);  
      setPhotosPageInfo(data.page_info);
      const newList = !refresh && photos.length 
        ? photos.concat(data.edges) 
        : data.edges;
      setPhotos(newList);
    } catch(e) {
      console.log(e);
    };
  }

  return (
    <>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        numColumns={3}
        data={photos}
        renderItem={({item}) =>
          <ThumbButton
            source={ item.node.image.uri }
            onPress={() => navigation.navigate(PHOTO, { photo: item.node })}
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