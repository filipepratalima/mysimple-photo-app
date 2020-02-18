import React from 'react';
import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as screens from './screens';

import Home from '../screens/Home';
import Gallery from '../screens/Gallery';
import Photo from '../screens/Photo';
import Camera from '../screens/Camera';

import withPermissions from '../components/hoc/withPermissions';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      // initialRouteName={screens.HOME}
      screenOptions={{}}
    >
      <Stack.Screen name={screens.HOME} component={withPermissions(Home)} options={Home.navigationOptions}/>
      <Stack.Screen name={screens.GALLERY} component={withPermissions(Gallery)} />
      <Stack.Screen name={screens.PHOTO} component={Photo} />
      <Stack.Screen name={screens.CAMERA} component={withPermissions(Camera)} />
    </Stack.Navigator>
  </NavigationContainer>
)
