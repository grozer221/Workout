import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExercisesTabNavigatorParams } from '../types/navigation';
import { Exercises } from '../components/exercises/Exercises';
import { getDefaultOptions } from './getDefaultOptions';
import { useAppTexts } from '../hooks/useAppTexts';
import { tabBar } from './tabBar';
import { useAppTheme } from '../hooks/theme';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator<ExercisesTabNavigatorParams>();

export const ExercisesTabNavigator = () => {
  const T = useAppTexts();
  const theme = useAppTheme();

  return (
    <Tab.Navigator screenOptions={getDefaultOptions} tabBar={props => tabBar(props, theme)}>
      <Tab.Screen
        name="Exercises"
        options={{
          title: T.Exercises,
          tabBarIcon: ({color, size}) => (
            <AwesomeIcon name={'plus'} color={color} size={size} />
          ),
        }}
        component={Exercises}
      />
    </Tab.Navigator>
  );
};
