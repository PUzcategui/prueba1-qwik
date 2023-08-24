import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <p>Hola Mundo Cliente</p>
});

export const head: DocumentHead = {
    title: "List Client"
  };