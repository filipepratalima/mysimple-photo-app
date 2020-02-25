import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native'

interface Props {
  
}

type Params = {
  title?: string;
  subtitle?: string;
  showDeleteButton?: boolean;
  onDeleteButtonPress?: Function;
  overrideOnBackButtonPress?: Function;
}

const AppBar: React.FC<Props> = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const params: Params = route.params;

  return (
    <Appbar.Header>
      {navigation.canGoBack() && <Appbar.BackAction
        onPress={() => params.overrideOnBackButtonPress() 
          ? params.overrideOnBackButtonPress()
          : navigation.goBack()}
      />}
      <Appbar.Content
        title={params?.title || route.name}
        subtitle={params?.subtitle}
      />
      {params?.showDeleteButton && <Appbar.Action
        icon="delete"
        onPress={() => params?.onDeleteButtonPress()}
      />}
    </Appbar.Header>
  )
}

export default AppBar;
