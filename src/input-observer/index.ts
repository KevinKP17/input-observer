// parse and divide time by
const calculateTimestamp = (timeStamp: number, divider: number) => {
  return parseInt(Math.ceil(timeStamp / divider).toString())
}

// TODO: Better form of data to return for InputAttributes
// TODO: user selections events
export class InputObserver implements IObserver{
  private callback
  private options
  private eventListeners: any[]

  constructor(
    callback: EventCallback,
    options?: OptionsType,
  ) {
    this.callback = callback
    this.eventListeners = []
    this.options = {
      timestampDivider: 100,
      rawFormat: false,
      ...options,
    }
  }

  public observe(element: InputElement): void {
    this.eventListeners = [
      this.on('input', element, this.callback),
      this.on('blur', element, this.callback),
      this.on('focus', element, this.callback)
    ]
  }

  public unobserve(): void {
    this.eventListeners.map(event => {console.log(event); event()})
    this.eventListeners = []
  }

  private on(
    type: string,
    target: InputTarget = document,
    fn: EventCallback,
  ) {
    const options = { capture: true, passive: true }
    const callback = this.onCallback.bind(this, fn)

    target.addEventListener(type, callback, options)

    return () => target.removeEventListener(type, callback, options)
  }

  private onCallback(fn: EventCallback, event: Event) {
    if (this.options.rawFormat) return fn(event)

    return fn(this.convertInput(event))
  }

  private convertInput(event: Event): InputObserverValue {
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
