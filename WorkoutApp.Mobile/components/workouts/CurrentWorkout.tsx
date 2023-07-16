import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { CurrentWorkoutStackNavigatorParams } from '../../types/navigation';
import { FAB, Snackbar } from 'react-native-paper';
import { useAppTheme } from '../../hooks/theme';
// @ts-ignore
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { useAppDispatch } from '../../behaviour/store';
import { workoutsActions } from '../../behaviour/workouts/slice';
import { useAppTexts } from '../../hooks/useAppTexts';

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

  const onStart = () => {
    setIsStopwatchStart(true);
    setResetStopwatch(false);
  };

  const onStop = () => {
    setIsStopwatchStart(false);
    setResetStopwatch(true);

    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 2000);
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
              style={{backgroundColor: primary}}
              onTouchStart={onStart}
            />
          )}
        <FAB
          icon="plus"
          style={{backgroundColor: secondary}}
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
