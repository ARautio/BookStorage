import { writable } from "svelte/store";

const messageStore = writable(undefined);

const socket = new WebSocket(process.env.MANAGER_SOCKET_URL);

// Connection opened
socket.addEventListener("open", function (event) {
  console.log("It's open");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  try {
    const jsonData = JSON.parse(event.data);
    messageStore.set(jsonData);
  } catch {
    messageStore.set(event.data);
  }
});

export default {
  subscribe: messageStore.subscribe,
};
