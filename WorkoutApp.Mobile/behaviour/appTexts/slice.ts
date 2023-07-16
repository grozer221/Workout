import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  appTexts: Record<string, string>;
};

const initialState: InitialState = {
  appTexts: {},
};

const slice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    setAppTexts: (state, action: PayloadAction<{ key: string; value: string }[]>) => {
      const result: Record<string, string> = {};
      for (let i = 0; i < action.payload.length; i++)
        result[action.payload[i].key] = action.payload[i].value;
      state.appTexts = result;
    },

    toInitialState: (state, action: PayloadAction) => initialState,
  },
});

export const appTextsReducer = slice.reducer;
export const appTextsActions = slice.actions;
