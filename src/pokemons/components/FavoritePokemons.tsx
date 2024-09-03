'use client'

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store"
import { PokemonGrid } from "./PokemonGrid";
import { IoHeartOutline } from "react-icons/io5";

export const FavoritePokemons = () => {

    const favoritePokemons = useAppSelector(state => Object.values(state.pokemons.favorites));
    
    return (
        <>
            {
                favoritePokemons.length > 0 ? (<PokemonGrid pokemons={favoritePokemons} />) : (<NoFavorites />)
            }

        </>

    )
}

const NoFavorites = () => {
    return (
        <div className='flex flex-col h-[50vh] items-center justify-center'>
            <IoHeartOutline size={100} className='text-red-500' />
            <span>No hay Favoritos</span>
        </div>
    )
}

