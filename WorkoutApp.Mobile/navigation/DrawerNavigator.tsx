import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerNavigatorParams } from '../types/navigation';
import { ExercisesTabNavigator } from './ExercisesTabNavigator';
import { WorkoutsTabNavigator } from './WorkoutsTabNavigator';
import { useAppTexts } from '../hooks/useAppTexts';
import { LoginScreen } from '../components/auth/LoginScreen';
import { useAppSelector } from '../behaviour/store';

const Drawer = createDrawerNavigator<DrawerNavigatorParams>();

const DrawerNavigator = () => {
  const isAuthorized = useAppSelector(s => s.auth.isAuthorized);
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
      {!isAuthorized && (
        <Drawer.Screen
          name="DrawerLogin"
          component={LoginScreen}
          options={{title: T.Login}}
        />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
