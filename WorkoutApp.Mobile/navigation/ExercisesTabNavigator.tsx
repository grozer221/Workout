import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExercisesTabNavigatorParams } from '../types/navigation';
import { Exercises } from '../components/exercises/Exercises';
import { getDefaultOptions } from './getDefaultOptions';
import { useAppTexts } from '../hooks/useAppTexts';

const Tab = createBottomTabNavigator<ExercisesTabNavigatorParams>();

export const ExercisesTabNavigator = () => {
  const T = useAppTexts();

  return (
    <Tab.Navigator screenOptions={getDefaultOptions}>
      <Tab.Screen
        name="Exercises"
        options={{title: T.Exercises}}
        component={Exercises}
      />
    </Tab.Navigator>
  );
};
