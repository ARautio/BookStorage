import { writable } from "svelte/store";

export const createLogStore = () => {
  const store = writable([]);
  const add = (value: Object) =>
    store.update((old) => [{ ...value, timestamp: new Date() }, ...old]);

  return {
    subscribe: store.subscribe,
    add,
  };
};
