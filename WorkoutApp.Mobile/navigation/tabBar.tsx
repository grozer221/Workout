import * as React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { BottomNavigation } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { AppTheme } from '../types/theme';

export const tabBar = ({navigation, state, descriptors, insets}: BottomTabBarProps, theme: AppTheme) => (
  <BottomNavigation.Bar
    navigationState={state}
    safeAreaInsets={insets}
    style={{backgroundColor: theme.colors.surface}}
    onTabPress={({route, preventDefault}) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (event.defaultPrevented) {
        preventDefault();
      } else {
        navigation.dispatch({
          ...CommonActions.navigate(route.name, route.params),
          target: state.key,
        });
      }
    }}
    renderIcon={({route, focused, color}) => {
      const {options} = descriptors[route.key];
      return options.tabBarIcon
        ? options.tabBarIcon({focused, color, size: 24})
        : null;
    }}
    getLabelText={({route}) => {
      const {options} = descriptors[route.key];
      return options.tabBarLabel !== undefined
        ? options.tabBarLabel as string
        : options.title !== undefined
          ? options.title
          : undefined;
    }}
  />
);
