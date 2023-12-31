import { component$, useStore, useTask$ } from '@builder.io/qwik';
import { DocumentHead} from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-pokemons';
import type { SmallPokemon } from '~/interfaces';

interface PokemonPageState {
  currentPage: number;
  pokemons: SmallPokemon[];
}

export default component$(() => {

  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: [],
  });

  useTask$(async({track}) =>{
    track(() => {
      pokemonState.currentPage
    })
    const pokemons = await getSmallPokemons (pokemonState.currentPage * 10);
    pokemonState.pokemons = pokemons;
  });

  return <><div class="flex flex-col">
    <span class="my-5 text-5xl">Status</span>
    <span>Pagina actual: {pokemonState.currentPage} </span>
    <span>Está cargando: </span>
  </div>
    <div class="mt-10">
      <button onClick$={() => pokemonState.currentPage--} 
      class="btn btn-primary mr-2">Anteriores</button>
      <button onClick$={() => pokemonState.currentPage++}
      class="btn btn-primary mr-2">Siguientes</button>
    </div>

    <div class="grid grid-cols-6 mt-5">
      {
        pokemonState.pokemons.map(({ name, id }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={id} />
            <span>{name}</span>
          </div>
        ))
      }
    </div>
  </>
});

export const head: DocumentHead = {
  title: "List Client"
};