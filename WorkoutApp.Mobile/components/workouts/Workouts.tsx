import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, RefreshControl, ScrollView, View } from "react-native";
import { Text } from 'react-native-paper';
import { useLazyQuery } from '@apollo/client';
import { ListWorkoutData } from '../../behaviour/workouts/types';
import { listWorkout } from '../../behaviour/workouts/queries';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getTime } from '../../utils/momentUtils';
import { useAppEffect } from '../../hooks/useAppEffect';
import moment, { duration } from 'moment';

export const Workouts = () => {
  const [list, {data}] = useLazyQuery<ListWorkoutData>(listWorkout, {fetchPolicy: 'no-cache'});
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  useAppEffect(() => {
    console.log('effect');
    list();
  }, [isFocused]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await list();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {data?.workout.list.map(workout => (
        <TouchableOpacity key={workout.id}>
          <View style={styles.row}>
            <Text>{getTime(workout.dateStart)} - {getTime(workout.dateEnd)}</Text>
            <Text>{duration(moment(workout.dateEnd).diff(moment(workout.dateStart))).asMinutes().toFixed(1)} minutes</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  }
});
