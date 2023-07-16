import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workout } from './types';

type InitialState = {
    time: string;
    currentWorkout: Workout | null;
};

const initialState: InitialState = {
    time: '',
    currentWorkout: null,
};

const slice = createSlice({
    name: 'workouts',
    initialState,
    reducers: {
        setTime: (state: InitialState, action: PayloadAction<string>) => {
            state.time = action.payload;
        },
        setCurrentWorkout: (state: InitialState, action: PayloadAction<Workout | null>) => {
            state.currentWorkout = action.payload;
        },

        toInitialState: (state, action: PayloadAction) => initialState,
    },
});

export const workoutsReducer = slice.reducer;
export const workoutsActions = slice.actions;
