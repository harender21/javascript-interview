class Emitter {
    constructor() {
        this.events = {};
    }

    subscribe(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);

        // return subscription object
        const release = () => {
            const callbacks = this.events[eventName];
            if (!callbacks) return;

            // remove only this callback instance (first match)
            for (let i = 0; i < callbacks.length; i++) {
                if (callbacks[i] === callback) {
                    callbacks.splice(i, 1);
                    break;
                }
            }

            // cleanup if empty
            if (callbacks.length === 0) {
                delete this.events[eventName];
            }
        };

        return { release };
    }

    emit(eventName, ...args) {
        const callbacks = this.events[eventName];
        if (!callbacks) return;

        // copy to avoid issues if release happens during emit
        const listeners = [...callbacks];

        for (const cb of listeners) {
            cb(...args);
        }
    }
}

const emitter = new Emitter();

function callback1(a, b) {
    console.log("callback1:", a, b);
}

const sub1 = emitter.subscribe("event1", callback1);
const sub2 = emitter.subscribe("event2", () => console.log("event2"));
const sub3 = emitter.subscribe("event1", callback1);

emitter.emit("event1", 1, 2);
// callback1 runs twice

sub1.release();

emitter.emit("event1", 1, 2);
// callback1 runs once

sub3.release();

emitter.emit("event1", 1, 2);
// nothing happens