import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'purple',
    accent: 'magenta',
  }
}