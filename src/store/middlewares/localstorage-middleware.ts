import { Dispatch, MiddlewareAPI, Action } from "@reduxjs/toolkit";
import { RootState } from "..";

export const localStorageMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => (action: Action) => {
        next(action);

        if (action.type === 'pokemons/toggleFavorite') {
            const { pokemons } = state.getState() as RootState;
            localStorage.setItem('favorites-pokemons', JSON.stringify(pokemons));
            return;
        }
    }
}