import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";


export default component$(() => {
  const pokemonId = useSignal(1);

  const changePokemonId = $((value: number) =>{
    if ((pokemonId.value + value) <= 0) return;

    pokemonId.value += value;
  })

  const showBackImage = useSignal(false);

  const showPokemon = useSignal(false);

  return (
    <>
      <span class='text-2xl'>Buscador simple</span>
      <span class='text-9xl'>{pokemonId.value}</span>
      <PokemonImage id={pokemonId.value} backImage = {showBackImage.value} isVisible = {showPokemon.value}/>
      <div class="mt-2">
        <button onClick$={ () => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ () => changePokemonId(+1) } class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={ () => showBackImage.value = !showBackImage.value } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={ () => showPokemon.value = !showPokemon.value } class="btn btn-primary mr-2">Revelar</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Prueba Qwik",
  meta: [
    {
      name: "description",
      content: "Mi primera app de Qwik",
    },
  ],
};
