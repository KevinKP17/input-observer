'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// parse and divide time by
const calculateTimestamp = (timeStamp, divider) => {
    return parseInt(Math.ceil(timeStamp / divider).toString());
};
// TODO: Better form of data to return for InputAttributes
// TODO: user selections events
class InputObserver {
    constructor(callback, options) {
        this.callback = callback;
        this.options = Object.assign({ timestampDivider: 100, rawFormat: false }, options);
    }
    observe(element) {
        this.on('input', element, this.callback);
        this.on('blur', element, this.callback);
        this.on('focus', element, this.callback);
    }
    on(type, target = document, fn) {
        const options = { capture: true, passive: true };
        target.addEventListener(type, this.onCallback.bind(this, fn), options);
        return () => target.removeEventListener(type, fn, options);
    }
    onCallback(fn, event) {
        if (this.options.rawFormat)
            return fn(event);
        return fn(this.convertInput(event));
    }
    convertInput(event) {
        if (event instanceof InputEvent) {
            return {
                data: event.currentTarget.value,
                isTrusted: event.isTrusted,
                inputType: event.inputType,
                timeStamp: calculateTimestamp(event.timeStamp, this.options.timestampDivider),
            };
        }
        else if (event instanceof FocusEvent) {
            return {
                data: null,
                isTrusted: event.isTrusted,
                inputType: event.type,
                timeStamp: calculateTimestamp(event.timeStamp, this.options.timestampDivider),
            };
        }
        else {
            return event;
        }
    }
}

exports.InputObserver = InputObserver;
//# sourceMappingURL=index.js.map
