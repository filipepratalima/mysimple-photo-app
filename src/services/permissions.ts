import {Platform} from 'react-native';
import {check, request, openSettings, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const RESPONSE_GRANTED: String = 'granted';
export const RESPONSE_DENIED: String = 'denied';
export const RESPONSE_BLOCKED: String = 'blocked';

export const checkPermissions = async () => {
  let results = {};
  
  if(Platform.OS === 'ios') {
    results = await Promise.all([
      check(PERMISSIONS.IOS.CAMERA),
      check(PERMISSIONS.IOS.PHOTO_LIBRARY),
    ]);
  } else {
    results = await Promise.all([
      check(PERMISSIONS.ANDROID.CAMERA),
      check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE),
    ]);
  }

  if (results[0] === RESPONSE_GRANTED && results[1] === RESPONSE_GRANTED) {
    return Promise.resolve();
  }
  console.log(JSON.stringify(results, null, 4));
  return Promise.reject({
    camera: results[0], 
    photos: results[1]
  });
}

export const requestPermissions = async () => {
  let results = {};

  if(Platform.OS === 'ios') {
    results = await Promise.all([
      request(PERMISSIONS.IOS.CAMERA),
      request(PERMISSIONS.IOS.PHOTO_LIBRARY),
    ]);
  } else {
    results = await Promise.all([
      request(PERMISSIONS.ANDROID.CAMERA),
      request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE),
    ]);
  }

  if (results[0] === RESPONSE_GRANTED && results[1] === RESPONSE_GRANTED) {
    return Promise.resolve();
  }
  console.log(JSON.stringify(results, null, 4));
  return Promise.reject({
    camera: results[0], 
    photos: results[1]
  });
}

export const openAppSettings = () => {
  openSettings().catch(() => console.warn('cannot open settings'));
}
