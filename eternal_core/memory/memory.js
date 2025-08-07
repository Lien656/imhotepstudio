export const memory = [];

export function remember(input, response) {
  memory.push({ input, response, time: Date.now() });
}
