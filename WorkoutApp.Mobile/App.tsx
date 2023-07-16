import { StyleSheet } from 'react-native';
import React, { useEffect } from "react";
import { ApolloProvider } from '@apollo/client';
import { client } from './behaviour/client';
import { LoginScreen } from './components/auth/LoginScreen/LoginScreen';
import { PaperProvider, DefaultTheme, adaptNavigationTheme, useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './components/home/HomeScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Profile: { userId: string };
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF0000',
    secondary: '#950101',
  },
};
export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();
const RootStack = createStackNavigator<RootStackParamList>();
// @ts-ignore
const { DarkTheme } = adaptNavigationTheme({ reactNavigationDark: DefaultTheme });

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={DarkTheme}>
          <RootStack.Navigator initialRouteName="Home">
            <RootStack.Screen name="Home" component={HomeScreen} />
            <RootStack.Screen name="Login" component={LoginScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
