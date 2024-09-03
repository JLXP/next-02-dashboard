import { PokemonGrid, PokemonReponse, SimplePokemon } from '@/pokemons';
import { FavoritePokemons } from '../../../pokemons/components/FavoritePokemons';
import { IoHeartOutline } from 'react-icons/io5';

export const metadata = {
    title: 'Favoritos',
    description: 'SEO Title'
}

export default async function PokemonPage() {


    return (
        <div className='flex flex-col'>

            <span className='text-5xl my-2'>Pokemons Favoritos <small className='text-blue-500'>Global State</small> </span>

            <FavoritePokemons />


        </div>
    )
}


