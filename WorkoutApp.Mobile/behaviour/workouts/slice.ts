import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    time: string;
};

const initialState: InitialState = {
    time: '',
};

const slice = createSlice({
    name: 'workouts',
    initialState,
    reducers: {
        setTime: (state: InitialState, action: PayloadAction<string>) => {
            state.time = action.payload;
        },

        toInitialState: (state, action: PayloadAction) => initialState,
    },
});

export const workoutsReducer = slice.reducer;
export const workoutsActions = slice.actions;
