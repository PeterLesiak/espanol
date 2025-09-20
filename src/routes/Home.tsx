import { A } from '@solidjs/router';

export default function Home() {
  return (
    <div class="grid h-dvh place-items-center p-4">
      <div class="grid gap-20">
        <h2 class="text-center text-4xl font-semibold">Learn numbers in Spanish</h2>

        <div class="grid gap-5">
          <A href="/play/numbers-to-spanish">
            <button class="w-full cursor-pointer rounded-md bg-black p-3 font-semibold text-white hover:bg-neutral-900">
              Numbers to Spanish
            </button>
          </A>
          <A href="/play/spanish-to-numbers">
            <button class="w-full cursor-pointer rounded-md bg-black p-3 font-semibold text-white hover:bg-neutral-900">
              Spanish to numbers
            </button>
          </A>
        </div>
      </div>
    </div>
  );
}
