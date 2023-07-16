import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerNavigatorParams } from '../types/navigation';
import { ExercisesTabNavigator } from './ExercisesTabNavigator';
import { WorkoutsTabNavigator } from './WorkoutsTabNavigator';
import { useAppTexts } from '../hooks/useAppTexts';

const Drawer = createDrawerNavigator<DrawerNavigatorParams>();

const DrawerNavigator = () => {
  const T = useAppTexts();

  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="DrawerWorkouts"
        component={WorkoutsTabNavigator}
        options={{title: T.Workouts}}
      />
      <Drawer.Screen
        name="DrawerExercises"
        component={ExercisesTabNavigator}
        options={{title: T.Exercises}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
