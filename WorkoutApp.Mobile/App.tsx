import 'react-native-gesture-handler';
import React from "react";
import { ApolloProvider } from '@apollo/client';
import { client } from './behaviour/client';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './constants/theme';
import BottomTabNavigator from './navigation/TabNavigator';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <DrawerNavigator  />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
