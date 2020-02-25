import React from 'react';
import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as screens from './screens';

import Gallery from '../screens/Gallery';
import Photo from '../screens/Photo';
import Camera from '../screens/Camera';
import AppBar from '../components/AppBar';
import withPermissions from '../components/hoc/withPermissions';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName={screens.GALLERY}
      headerMode="float"
      screenOptions={{
        header: () => <AppBar />
      }}
    >
      <Stack.Screen 
        name={screens.GALLERY} 
        component={withPermissions(Gallery)}
      />
      <Stack.Screen 
        name={screens.PHOTO} 
        component={Photo}
      />
      <Stack.Screen 
        name={screens.CAMERA} 
        component={withPermissions(Camera)}
      />
    </Stack.Navigator>
  </NavigationContainer>
)
