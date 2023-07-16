import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../users/types';
import { AuthResponse } from './types';
import { asyncStorageSetItem, asyncStorageRemoveItem } from '../../utils/asyncStorageUtils';

type InitialState = {
    authedUser?: User | null;
    isAuthorized: boolean;
    loading: boolean;
};

const initialState: InitialState = {
    isAuthorized: false,
    authedUser: null,
    loading: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state: InitialState, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        login: (state: InitialState, action: PayloadAction<AuthResponse>) => {
            state.isAuthorized = true;
            state.authedUser = action.payload.user;
            asyncStorageSetItem('AuthToken', action.payload.token);
        },
        logout: (state: InitialState) => {
            state.isAuthorized = false;
            state.authedUser = null;
            asyncStorageRemoveItem('AuthToken');
        },

        toInitialState: (state, action: PayloadAction) => initialState,
    },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
