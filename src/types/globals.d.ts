declare type InputTarget = Document | Window | Element;
declare type InputObserverValue = InputAttributes | Event;
declare type InputElement = HTMLTextAreaElement | HTMLInputElement;

declare type EventCallback = (value: InputObserverValue) => void
declare type EventHandler = () => void;

declare function on(
  type: string,
  fn: EventCallback,
  target: InputTarget
): EventHandler;

declare type InputAttributes = {
  data: string | null;
  isTrusted: boolean;
  inputType: string | undefined;
  timeStamp: number;
}

