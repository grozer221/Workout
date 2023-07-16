import 'react-native-gesture-handler';
import React from "react";
import { ApolloProvider } from '@apollo/client';
import { client } from './behaviour/client';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './constants/theme';
import BottomTabNavigator from './navigation/TabNavigator';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
