import EventEmitter from "eventemitter3";

const eventEmitter = new EventEmitter();

const Emitter = {
  subscribe: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  unsubscribe: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
};

Object.freeze(Emitter);

export default Emitter;
