interface Result = {
    name: string;
    url: string;
}

interface PokemonList = {
    count: number;
    next?: string;
    previous?: string;
    results: Array<Result>;
}

export default PokemonList;
