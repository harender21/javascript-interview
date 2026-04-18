# Event Emitter (Custom Implementation)

A simple Event Emitter implementation in JavaScript inspired by Node.js `EventEmitter`. It supports subscribing to events, emitting events with arguments, multiple subscriptions, and unsubscribing via a `release()` method.

---

## Features

- Subscribe to events with callbacks
- Emit events with arguments
- Multiple listeners for the same event
- Same callback can be subscribed multiple times
- Unsubscribe using `release()` method
- Safe handling of listeners during emit

---

## Implementation

```js
class Emitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    const release = () => {
      const callbacks = this.events[eventName];
      if (!callbacks) return;

      for (let i = 0; i < callbacks.length; i++) {
        if (callbacks[i] === callback) {
          callbacks.splice(i, 1);
          break;
        }
      }

      if (callbacks.length === 0) {
        delete this.events[eventName];
      }
    };

    return { release };
  }

  emit(eventName, ...args) {
    const callbacks = this.events[eventName];
    if (!callbacks) return;

    const listeners = [...callbacks];

    for (const cb of listeners) {
      cb(...args);
    }
  }
}