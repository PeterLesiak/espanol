import { createEffect, createMemo, createSignal, onMount } from 'solid-js';
import { useParams } from '@solidjs/router';

import { numberToSpanish } from '@/lib/translation';
import { randomInt } from '@/lib/random';
import { padNumber, splitBySpace } from '@/lib/format';

function generateNumber() {
  if (Math.random() < 3 / 4) {
    return randomInt(1_000_000, 999_999_999);
  }

  if (Math.random() < 2 / 3) {
    return randomInt(1_000, 999_999);
  }

  return randomInt(0, 999);
}

export default function Play() {
  const params = useParams();

  const [number, setNumber] = createSignal(generateNumber());
  const spanishNumber = createMemo(() => numberToSpanish(number()));
  const spanishNumberChunks = createMemo(() => splitBySpace(spanishNumber()));

  const [hintVisible, setHintVisible] = createSignal(false);

  if (params.game == 'numbers-to-spanish') {
    const [guess, setGuess] = createSignal('');

    const guessChunks = createMemo(() => splitBySpace(guess()));

    let inputElement!: HTMLInputElement;

    onMount(() => inputElement.focus());

    function insertLetter(letter: string) {
      setGuess(guess() + letter);
      inputElement.focus();
    }

    createEffect(() => {
      const correct = spanishNumberChunks().every(
        (chunk, i) => chunk === guessChunks()[i],
      );

      if (correct) {
        setNumber(generateNumber());
        setHintVisible(false);
        inputElement.value = '';
      }
    });

    return (
      <div class="grid h-dvh place-items-center p-4">
        <div class="grid w-full max-w-[800px] gap-6">
          <h2 class="mb-6 text-center text-4xl font-semibold">{padNumber(number())}</h2>

          <input
            ref={inputElement}
            value={guess()}
            onInput={e => setGuess(e.currentTarget.value)}
            type="text"
            lang="es"
            placeholder="Escribe en español"
            class="border px-3 py-2"
          />

          <div class="flex items-center justify-center gap-6">
            <button
              onclick={() => insertLetter('á')}
              class="aspect-square w-10 cursor-pointer rounded-md border-2 font-semibold"
            >
              á
            </button>
            <button
              onclick={() => insertLetter('é')}
              class="aspect-square w-10 cursor-pointer rounded-md border-2 font-semibold"
            >
              é
            </button>

            <button
              onclick={() => setHintVisible(true)}
              class="w-fit cursor-pointer rounded-md bg-orange-400 px-4 py-2 font-semibold text-white hover:brightness-110"
            >
              me siento estúpido
            </button>

            <button
              onclick={() => insertLetter('ó')}
              class="aspect-square w-10 cursor-pointer rounded-md border-2 font-semibold"
            >
              ó
            </button>
            <button
              onclick={() => insertLetter('ú')}
              class="aspect-square w-10 cursor-pointer rounded-md border-2 font-semibold"
            >
              ú
            </button>
          </div>

          <span
            class={`${!hintVisible() ? 'opacity-0' : ''} text-center text-lg font-semibold text-orange-400`}
          >
            {spanishNumber()}
          </span>
        </div>
      </div>
    );
  }

  if (params.game == 'spanish-to-numbers') {
    const [guess, setGuess] = createSignal('');

    let inputElement!: HTMLInputElement;

    onMount(() => inputElement.focus());

    createEffect(() => {
      const success = number() === Number(guess().replaceAll(' ', ''));

      if (success) {
        setNumber(generateNumber());
        setHintVisible(false);
        inputElement.value = '';
      }
    });

    return (
      <div class="grid h-dvh place-items-center p-4">
        <div class="grid w-full max-w-[800px] gap-6">
          <h2 lang="es" class="mb-6 text-center text-xl font-semibold lg:text-4xl">
            {spanishNumber()}
          </h2>

          <input
            ref={inputElement}
            value={guess()}
            onInput={e => setGuess(e.currentTarget.value)}
            type="text"
            placeholder="Escribe en español"
            class="border px-3 py-2"
          />

          <button
            onclick={() => setHintVisible(true)}
            class="mx-auto w-fit cursor-pointer rounded-md bg-orange-400 px-4 py-2 font-semibold text-white hover:brightness-110"
          >
            me siento estúpido
          </button>

          <span
            class={`${!hintVisible() ? 'opacity-0' : ''} text-center text-lg font-semibold text-orange-400`}
          >
            {padNumber(number())}
          </span>
        </div>
      </div>
    );
  }
}
