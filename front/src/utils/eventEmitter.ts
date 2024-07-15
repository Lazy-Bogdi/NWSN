type EventHandler = () => void;

class EventEmitter {
    private events: { [key: string]: EventHandler[] } = {};

    on(event: string, handler: EventHandler) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(handler);
    }

    off(event: string, handler: EventHandler) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(h => h !== handler);
    }

    emit(event: string) {
        if (!this.events[event]) return;

        this.events[event].forEach(handler => handler());
    }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
