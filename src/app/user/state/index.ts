import * as fromUser from "./user.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const getUserFeatureState = createFeatureSelector<fromUser.UserState>('users');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
)

export const getCurrentUSer = createSelector(
    getUserFeatureState,
    state => state.currentUser
)