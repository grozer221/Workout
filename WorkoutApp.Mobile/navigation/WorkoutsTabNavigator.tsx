import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WorkoutsTabNavigatorParams } from '../types/navigation';
import { CurrentWorkoutStackNavigator } from './CurrentWorkoutStackNavigator';
import Workouts from '../components/workouts/Workouts';
import { getDefaultOptions } from './getDefaultOptions';
import React from 'react';
import { Appbar, Text } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useAppSelector } from '../behaviour/store';
import { View, StyleSheet } from 'react-native';
import { useAppTexts } from '../hooks/useAppTexts';

const Tab = createBottomTabNavigator<WorkoutsTabNavigatorParams>();

export const WorkoutsTabNavigator = () => {
  const time = useAppSelector(s => s.workouts.time);
  const T = useAppTexts();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TabCurrentWorkout"
        component={CurrentWorkoutStackNavigator}
        options={{
          title: T.CurrentWorkout,
          headerShown: false,
          tabBarIcon: () => (
            <AwesomeIcon name={'plus'} color={'white'} />
          ),
        }}
      />
      <Tab.Screen
        name="TabWorkouts"
        component={Workouts}
        options={props => ({
          ...getDefaultOptions(props),
          title: T.Workouts,
          headerRight: () => (
            <View style={styles.row}>
              <Text>{time}</Text>
              <Appbar.Action icon="magnify" color={'white'} />
            </View>
          ),
          tabBarIcon: () => <AwesomeIcon name={'plus'} color={'white'} />,
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})
