import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { ApolloProvider } from '@apollo/client';
import { client } from './behaviour/client';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './constants/theme';
import DrawerNavigator from './navigation/DrawerNavigator';
import { Provider } from 'react-redux';
import { store } from './behaviour/store';
import { getAppTexts } from './behaviour/appTexts/queries';
import { appTextsActions } from './behaviour/appTexts/slice';
import { authActions } from './behaviour/auth/slice';
import { authMe } from './behaviour/auth/queries';
import { authMeData } from './behaviour/auth/types';
import { getAppTextsData } from './behaviour/appTexts/types';

export default function App() {
  useEffect(() => {
    client.query<authMeData>({query: authMe})
      .then(res => store.dispatch(authActions.login(res.data.auth.me)))
      .catch(() => {
      });

    client.query<getAppTextsData>({query: getAppTexts})
      .then(res => store.dispatch(appTextsActions.setAppTexts(res.data.appTexts.getTexts)));
  }, []);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={{
            dark: true,
            colors: {
              primary: theme.colors.primary,
              background: theme.colors.background,
              text: 'white',
              card: theme.colors.surface,
              border: 'rgb(0, 0, 0)',
              notification: 'yellow',
            },
          }}>
            <DrawerNavigator />
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
    </Provider>
  );
}
