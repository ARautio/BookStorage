import { get_slot_changes } from "svelte/internal";

const PATH = "http://localhost:8000";

/**
 * Generic GET method
 * @param path - url path after domain
 * @returns JSON data
 */
export const get = async (path: string) => {
  const response = await fetch(`${PATH}${path}`);
  return await response.json();
};

/**
 * Generic POST method
 * @param path - url path after domain
 * @param data - content to be posted
 * @returns JSON data
 */
export const post = async (path: string, data: any) => {
  const response = await fetch(`${PATH}${path}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return await response.json();
};
