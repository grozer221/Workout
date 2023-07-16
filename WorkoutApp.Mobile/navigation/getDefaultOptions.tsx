import { Appbar, IconButton } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';

export const getDefaultOptions = (props: any, mainRouteName?: string) => ({
  headerLeft: () => headerLeft(props, mainRouteName),
});

export const headerLeft = ({navigation, route}: any, mainRouteName?: string) => {
  if (route.name === mainRouteName || !mainRouteName)
    return (
      <IconButton
        icon="menu"
        size={20}
        iconColor={'white'}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    );

  return (
    <Appbar.BackAction iconColor={'white'} onPress={() => navigation.goBack()} />
  );
};
