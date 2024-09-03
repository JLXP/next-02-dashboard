import { PokemonGrid, PokemonReponse, SimplePokemon } from '@/pokemons';


export const metadata = {
    title: '151 Pokemons',
    description: 'SEO Title'
}

const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {
    const data: PokemonReponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(res => res.json());

    const pokemon = data.results.map(pokemon => ({
        id: pokemon.url.split('/').at(-2)!,
        name: pokemon.name
    }))

    //throw new Error('Esto es un error que no deberia de suceder');

    return pokemon;
}

export default async function PokemonPage() {

    const pokemons = await getPokemons(151);

    return (
        <div className='flex flex-col'>

            <span className='text-5xl my-2'>Listado de Pokemons <small className='text-blue-500'>estatico</small> </span>

            <PokemonGrid pokemons={pokemons} />


        </div>
    )
}
