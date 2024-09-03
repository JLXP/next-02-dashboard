import { Pokemon, PokemonReponse } from '@/pokemons';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SiPokemon } from "react-icons/si";
import { CgPokemon } from "react-icons/cg";
import { Type } from '@/pokemons/interfaces/pokemon';

interface Props {
    params: { name: string }
}

//! En build time
export async function generateStaticParams() {
    const data: PokemonReponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        .then(res => res.json());

    const static151Pokemons = data.results.map(pokemon => ({
        name: pokemon.name
    }))

    //throw new Error('Esto es un error que no deberia de suceder');

    return static151Pokemons.map(({ name }) => ({
        name: name
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    try {

        const { id, name } = await getPokemon(params.name);

        return {
            title: `#${id}-${name}`,
            description: `Pagina del pokemon ${name}`
        }

    } catch (error) {
        return {
            title: 'pagina del pokemon',
            description: 'jhjsad'
        }
    }

}

const getPokemon = async (name: string): Promise<Pokemon> => {

    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
            cache: 'force-cache'
        }).then(resp => resp.json()); //TODO: cambiar esto en un futuro

        console.log('Se cargo', pokemon.name)

        return pokemon;
    } catch (error) {
        notFound();
    }

}

const getTypeColorPokemon = async (types: Type[]): Promise<string> => {

    let type = '';

    if (types[1]?.type.name) {
        type = types[1]?.type.name;
    } else {
        type = types[0]?.type.name;
    }

    switch (type) {
        case 'normal':
            return 'bg-amber-300';
            break;
        case 'fighting':
            return 'bg-green-300';
            break;
        case 'flying':
            return 'bg-sky-300';
            break;
        case 'poison':
            return 'bg-purple-300';
            break;
        case 'ground':
            return 'bg-green-300';
            break;
        case 'rock':
            return 'bg-green-300';
            break;
        case 'bug':
            return 'bg-blue-300';
            break;
        case 'ghost':
            return 'bg-green-300';
            break;
        case 'steel':
            return 'bg-blue-300';
            break;
        case 'fire':
            return 'bg-red-300';
            break;
        case 'water':
            return 'bg-blue-300';
            break;
        case 'grass':
            return 'bg-green-300';
            break;
        case 'electric':
            return 'bg-yellow-300';
            break;
        case 'psychic':
            return 'bg-blue-300';
            break;
        case 'ice':
            return 'bg-green-300';
            break;
        case 'dragon':
            return 'bg-blue-300';
            break;
        case 'dark':
            return 'bg-green-300';
            break;
        case 'fairy':
            return 'bg-pink-300';
            break;
        case 'stellar':
            return 'bg-green-300';
            break;
        case 'unknown':
            return 'bg-green-300';
            break;

        default:
            return 'bg-red-300';
            break;
    }


}

export default async function PokemonPage({ params }: Props) {

    const pokemon = await getPokemon(params.name);
    const color = await getTypeColorPokemon(pokemon.types);

    return (
        <div className="flex my-5 flex-col items-center text-slate-800">
            <div className="relative flex flex-col items-center rounded-[20px] bg-slate-300 w-[700px] mx-auto  bg-clip-border shadow-lg p-3">
                <div className="mt-2 mb-8 w-full">
                    <div className="flex justify-between items-center px-2">
                        <h1 className="text-4xl font-bold text-slate-700 capitalize">
                            #{pokemon.id} {pokemon.name}
                        </h1>

                        <SiPokemon size={100} className='text-red-600' />
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <Image
                            src={pokemon.sprites.other?.dream_world.front_default ?? ''}
                            width={150}
                            height={150}
                            alt={`Imagen del pokemon ${pokemon.name}`}
                            className="mb-5"
                        />


                        <div className="flex flex-col">
                            <p className="flex items-center">
                                <CgPokemon size={20} />
                                <span className=" text-2xl font-bold text-slate-700 capitalize">
                                    Moves
                                </span>
                            </p>

                            <div className="flex flex-wrap">
                                {
                                    pokemon.moves.map(move => (
                                        <p key={move.move.name} className="mr-2 capitalize"><span className='text-red-500'>*</span>{move.move.name}</p>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 px-2 w-full">

                    <div className={`flex flex-col items-start justify-center ${color ? color : 'bg-white'} rounded-2xl bg-clip-border px-3 py-4  drop-shadow-lg`}>
                        <p className="flex text-sm text-gray-600">
                            <span className="text-red-600">
                                <CgPokemon size={20} />
                            </span>
                            Types</p>
                        <div className="text-base font-medium text-navy-700 flex">
                            {
                                pokemon.types.map(type => (
                                    <p key={type.slot} className="mr-2 capitalize">{type.type.name}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div className={`flex flex-col items-start justify-center ${color ? color : 'bg-white'} rounded-2xl bg-clip-border px-3 py-4  drop-shadow-lg`}>
                        <p className="flex text-sm text-gray-600">
                            <span className="text-red-600">
                                <CgPokemon size={20} />
                            </span>
                            Peso
                        </p>
                        <span className="text-base font-medium text-navy-700 flex">
                            {
                                pokemon.weight
                            }
                        </span>
                    </div>

                    <div className={`flex flex-col items-start justify-center ${color ? color : 'bg-white'} rounded-2xl bg-clip-border px-3 py-4  drop-shadow-lg`}>
                        <p className="flex text-sm text-gray-600">
                            <span className="text-red-600">
                                <CgPokemon size={20} />
                            </span>
                            Regular Sprites
                        </p>
                        <div className="flex justify-center">

                            <Image
                                src={pokemon.sprites.front_default}
                                width={100}
                                height={100}
                                alt={`sprite ${pokemon.name}`}
                            />

                            <Image
                                src={pokemon.sprites.back_default}
                                width={100}
                                height={100}
                                alt={`sprite ${pokemon.name}`}
                            />

                        </div>
                    </div>

                    <div className={`flex flex-col items-start justify-center ${color ? color : 'bg-white'} rounded-2xl bg-clip-border px-3 py-4  drop-shadow-lg`}>
                        <p className="flex text-sm text-gray-600">
                            <span className="text-red-600">
                                <CgPokemon size={20} />
                            </span>
                            Shiny Sprites
                        </p>
                        <div className="flex justify-center">

                            <Image
                                src={pokemon.sprites.front_shiny}
                                width={100}
                                height={100}
                                alt={`sprite ${pokemon.name}`}
                            />

                            <Image
                                src={pokemon.sprites.back_shiny}
                                width={100}
                                height={100}
                                alt={`sprite ${pokemon.name}`}
                            />

                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
}