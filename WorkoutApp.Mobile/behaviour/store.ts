import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authReducer } from './auth/slice';
import { workoutsReducer } from './workouts/slice';
import { appTextsReducer } from './appTexts/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutsReducer,
    appTexts: appTextsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
