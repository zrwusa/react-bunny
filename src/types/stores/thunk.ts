import type {ThunkAction, ThunkDispatch} from 'redux-thunk';
import type {RootState} from '../models';
import type {Action} from 'redux';

export type BunnyExtraArg = { myExtraArg1: string };
export type ThunkResult<R> = ThunkAction<R, RootState, BunnyExtraArg, Action>;
export type BunnyThunkDispatch = ThunkDispatch<RootState, BunnyExtraArg, Action>;
