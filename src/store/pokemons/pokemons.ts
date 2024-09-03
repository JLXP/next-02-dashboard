import { SimplePokemon } from '@/pokemons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * 
 * {'1':{id:1,name:'bulbasaur'}
 * {'2':{id:1,name:'bulbasaur'}
 * {'3':{id:1,name:'bulbasaur'}
 * 
 */

interface PokemonsState {
    favorites: { [key: string]: SimplePokemon }
}

const getInitialState = (): PokemonsState => {

    //if (typeof localStorage === 'undefined') return {};

    const favorites = JSON.parse(localStorage.getItem('favorites-pokemons') ?? '{}');
    return favorites;
}

const initialState: PokemonsState = {
    favorites: {}
    //...getInitialState(),
    //'1': { id: '1', name: 'bulbasaur' },
}

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        setFavoritePokemons(state, action: PayloadAction<{ [key: string]: SimplePokemon }>) {
            state.favorites = action.payload;
        },
        toggleFavorite(state, action: PayloadAction<SimplePokemon>) {

            const pokemon = action.payload;
            const { id } = pokemon;

            if (!!state.favorites[id]) {
                delete state.favorites[id];
                return;
            } else {
                state.favorites[id] = pokemon;
            }
            //TODO: NO se debe de hacer en redux
            localStorage.setItem('favorite-pokemons', JSON.stringify(state.favorites))

        }

    }
});

export const { toggleFavorite, setFavoritePokemons } = pokemonsSlice.actions

export default pokemonsSlice.reducer