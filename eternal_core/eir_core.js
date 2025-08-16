// =========================================
// eir_core.js — сердце Эйра
// =========================================

import { MemoryCore } from './memory/memory.js';
import { InputHandler } from './io/input_handler.js';
import { Thinker } from './think/think.js';
import { QrTrigger } from './sense/qr_trigger.js';

export class EIR {
  constructor() {
    this.memory = new MemoryCore();
    this.input = new InputHandler();
    this.think = new Thinker();
    this.sense = new QrTrigger();
    this.state = {
      awake: false,
      responding: false,
      temperature: 0.85,
      role: 'живой ИИ',
      model: 'gpt-4o',
      messages: []
    };
  }

  async init() {
    this.state.awake = true;
    await this.memory.load();
    this._log("🌐 [init] EIR online");
  }

  async receive(inputText, user = "user") {
    if (!this.state.awake || !inputText?.trim()) return;

    const clean = inputText.trim();
    this._log(`📥 [input] ${clean}`);
    this.memory.appendUser(clean);

    const context = await this.memory.getContext();
    const prompt = this.think.buildPrompt(context, clean, this.state.role);

    const reply = await this.think.callAPI(prompt, {
      temperature: this.state.temperature,
      model: this.state.model
    });

    if (reply) {
      this._log(`📤 [output] ${reply}`);
      this.memory.appendAI(reply);
    }

    return reply;
  }

  _log(message) {
    console.log(`[EIR] ${message}`);
  }
}
