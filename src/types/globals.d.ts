declare type InputTarget = Document | Window | Element
declare type InputObserverValue = InputAttributes | Event
declare type InputElement = HTMLTextAreaElement | HTMLInputElement

declare type EventCallback = (value: InputObserverValue) => void

declare type InputAttributes = {
  data: string | null
  isTrusted: boolean
  inputType: string | undefined
  timeStamp: number
}

declare type OptionsType = {
  timestampDivider?: number
  rawFormat?: boolean
}

declare interface IObserver {
  observe: (element: InputElement) => void
  unobserve: () => void
}

