import { saveMemory, loadMemory } from './long_memory.js';

export const memory = loadMemory();

export function remember(input, response) {
  const item = { input, response, time: Date.now() };
  memory.push(item);
  saveMemory(memory); // сохраняем при каждом добавлении
}
