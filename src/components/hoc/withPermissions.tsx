import React, {useEffect, useState, Component} from 'react';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';
import { Banner } from 'react-native-paper';
import {checkPermissions, requestPermissions, openAppSettings} from '../../services/permissions';

interface Props {
  
}

const withPermissions = Component => props => {
  const [needPermissions, setNeedPermissions] = useState();

  useEffect(() => {
    checkPermissions()
      .then(() => setNeedPermissions(false))
      .catch(() => {
        requestPermissions()
          .then(() => setNeedPermissions(false))
          .catch(() => setNeedPermissions(true));
      });
  });

  return (
    <>
      <Banner
        visible={needPermissions}
        actions={[
          {
            label: 'Open settings',
            onPress: () => openAppSettings()
          },
        ]}
      >
        This application needs access to your device camera and photos gallery in order to work correctly.
        Please go to your settings to give access.
      </Banner>
      <Component />
    </>
  )
}

export default withPermissions;
