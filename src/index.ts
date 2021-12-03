type OptionsType = {
  timestampDivider?: number
  rawFormat?: boolean
}

// parse and divide time by
const calculateTimestamp = (timeStamp: number, divider: number) => {
  return parseInt(Math.ceil(timeStamp / divider).toString())
}

// TODO: Better form of data to return for InputAttributes
// TODO: user selections events
export class InputObserver {
  private callback
  private options

  constructor(
    callback: EventCallback,
    options?: OptionsType,
  ) {
    this.callback = callback
    this.options = {
      timestampDivider: 100,
      rawFormat: false,
      ...options,
    }
  }

  observe(element: InputElement) {
    this.on('input', element, this.callback)
    this.on('blur', element, this.callback)
    this.on('focus', element, this.callback)
  }

  on(
    type: string,
    target: InputTarget = document,
    fn: EventCallback,
  ): EventHandler {
    const options = { capture: true, passive: true }

    target.addEventListener(type, this.onCallback.bind(this, fn), options)

    return () => target.removeEventListener(type, fn, options)
  }

  onCallback(fn: EventCallback, event: Event) {
    if (this.options.rawFormat) return fn(event)

    return fn(this.convertInput(event))
  }

  convertInput(event: Event): InputObserverValue {
    if (event instanceof InputEvent) {
      return {
        data: (<InputElement>event.currentTarget).value,
        isTrusted: event.isTrusted,
        inputType: event.inputType,
        timeStamp: calculateTimestamp(
          event.timeStamp,
          this.options.timestampDivider,
        ),
      }
    } else if (event instanceof FocusEvent) {
      return {
        data: null,
        isTrusted: event.isTrusted,
        inputType: event.type,
        timeStamp: calculateTimestamp(
          event.timeStamp,
          this.options.timestampDivider,
        ),
      }
    } else {
      return event
    }
  }
}
