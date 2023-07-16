import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { CurrentWorkoutStackNavigatorParams } from '../../types/navigation';
import { FAB, Snackbar, Text } from 'react-native-paper';
import { useAppTheme } from '../../hooks/theme';
// @ts-ignore
import { Stopwatch } from 'react-native-stopwatch-timer';
import { useAppDispatch, useAppSelector } from '../../behaviour/store';
import { workoutsActions } from '../../behaviour/workouts/slice';
import { useAppTexts } from '../../hooks/useAppTexts';
import { useMutation } from '@apollo/client';
import { createWorkout, editWorkout } from '../../behaviour/workouts/queries';
import { CreateWorkoutVars, CreateWorkoutData, EditWorkoutVars, EditWorkoutData } from '../../behaviour/workouts/types';
import moment from 'moment';
import { debounce } from 'lodash';
import { getTime } from '../../utils/momentUtils';

type Props = NativeStackScreenProps<CurrentWorkoutStackNavigatorParams, 'CurrentWorkout'>;

export const CurrentWorkout = ({navigation}: Props) => {
  const T = useAppTexts();
  const theme = useAppTheme();
  const primary = theme.colors.primary;
  const secondary = theme.colors.secondary;
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const dispatch = useAppDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [create] = useMutation<CreateWorkoutData, CreateWorkoutVars>(createWorkout);
  const [edit] = useMutation<EditWorkoutData, EditWorkoutVars>(editWorkout);
  const currentWorkout = useAppSelector(s => s.workouts.currentWorkout);

  const onStart = debounce(async () => {
    console.log('start');
    setIsStopwatchStart(true);
    setResetStopwatch(false);
    console.log(moment.utc().format());
    try {
      const res = await create({variables: {input: {dateStart: moment.utc().format(), dateEnd: null}}});
      dispatch(workoutsActions.setCurrentWorkout(res.data!.workout.create));
    } catch (e) {
      console.log(e);
    }
  }, 100);

  const onStop = async () => {
    console.log('stop', currentWorkout?.id);
    setIsStopwatchStart(false);
    setResetStopwatch(true);

    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 2000);

    if (currentWorkout) {
      try {
        const res = await edit({
          variables: {
            id: currentWorkout.id,
            input: {dateStart: null, dateEnd: moment.utc().format()},
          },
        });
        dispatch(workoutsActions.setCurrentWorkout(res.data!.workout.edit));
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Stopwatch
        start={isStopwatchStart}
        reset={resetStopwatch}
        options={{container: {height: 0}}}
        getTime={(time: string) => {
          dispatch(workoutsActions.setTime(time));
        }}
      />
      {currentWorkout && <Text>{getTime(currentWorkout.dateStart)} - {getTime(currentWorkout.dateEnd)}</Text>}
      <View style={styles.fabs}>
        {isStopwatchStart
          ? (
            <FAB
              icon={'stop'}
              style={{backgroundColor: 'red'}}
              onLongPress={onStop}
            />
          )
          : (
            <FAB
              icon={'play'}
              style={{backgroundColor: secondary}}
              onTouchStart={onStart}
            />
          )}
        <FAB
          icon="plus"
          style={{backgroundColor: primary}}
          onPress={() => navigation.navigate('CurrentWorkoutAddExercise')}
        />
      </View>
      <Snackbar visible={snackbarVisible} onDismiss={() => {
      }}>
        {T.WorkoutHasBeenSaved}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  fabs: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    gap: 10,
  },

  timer: {
    color: '#FFFFFF',
    fontSize: 76,
    fontWeight: '200',
    width: 110,
  },
  timerContainer: {
    flexDirection: 'row',
  },
});
