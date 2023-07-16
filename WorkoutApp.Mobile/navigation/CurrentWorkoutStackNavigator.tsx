import { createStackNavigator } from '@react-navigation/stack';
import { CurrentWorkoutStackNavigatorParams } from '../types/navigation';
import { CurrentWorkout } from '../components/workouts/CurrentWorkout';
import { WorkoutAddExercise } from '../components/workouts/WorkoutAddExercise';
import React from 'react';
import { getDefaultOptions } from './getDefaultOptions';
import { nameof } from '../utils/typeUtils';
import { Text } from 'react-native-paper';
import { useAppSelector } from '../behaviour/store';
import { StyleSheet } from 'react-native';
import { useAppTexts } from '../hooks/useAppTexts';

const Stack = createStackNavigator<CurrentWorkoutStackNavigatorParams>();

export const CurrentWorkoutStackNavigator = () => {
  const time = useAppSelector(s => s.workouts.time);
  const T = useAppTexts();

  return (
    <Stack.Navigator
      screenOptions={props => getDefaultOptions(props, nameof<CurrentWorkoutStackNavigatorParams>('CurrentWorkout'))}
    >
      <Stack.Screen
        name="CurrentWorkout"
        options={{
          title: T.CurrentWorkout,
          headerRight: () => <Text style={styles.time}>{time}</Text>,
        }}
        component={CurrentWorkout}
      />
      <Stack.Screen
        name="CurrentWorkoutAddExercise"
        options={{
          title: T.AddExercise,
          headerRight: () => <Text style={styles.time}>{time}</Text>,
        }}
        component={WorkoutAddExercise}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  time: {
    marginRight: 10,
  },
});
