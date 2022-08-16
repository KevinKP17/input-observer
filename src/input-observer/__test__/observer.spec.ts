// @todo: jest doesn't provide real browser API; better use e2e?
// @todo: need a way to get the timestamp value

import { InputObserver } from "../index";

let element: HTMLTextAreaElement;

beforeEach(() => {
  document.body.innerHTML = "<textarea id=\"textarea\"></textarea>";
  element = document.querySelector("textarea") as HTMLTextAreaElement;

  // InputEvent cannot interact with value of textarea;
  element?.addEventListener("input", (event) => {
    const e: InputEvent = <InputEvent>event;
    (<HTMLTextAreaElement>e.currentTarget).value += e.data;
  }, { capture: true, passive: true })
})

test("record input event", () => {
  let input: Partial<InputAttributes> = {};
  const callback: EventCallback = (data: InputObserverValue)=>{ input = data };

  const observer = new InputObserver(callback)
  observer.observe(element)

  element.dispatchEvent(new FocusEvent("focus"))
  expect(input.data).toEqual(null)
  expect(input.inputType).toEqual("focus")

  element.dispatchEvent(new InputEvent("input", { data: "a", inputType: "insertText" }))
  expect(input.data).toEqual("a")
  expect(input.inputType).toEqual("insertText")

  element.dispatchEvent(new InputEvent("input", { data: "bc", inputType: "insertText" }))
  expect(input.data).toEqual("abc")
  expect(input.inputType).toEqual("insertText")

  element.dispatchEvent(new FocusEvent("blur"))
  expect(input.data).toEqual(null)
  expect(input.inputType).toEqual("blur")

  input = {}
  observer.unobserve()

  element.dispatchEvent(new FocusEvent("focus"))
  element.dispatchEvent(new InputEvent("input", { data: "a", inputType: "insertText" }))
  element.dispatchEvent(new FocusEvent("blur"))

  expect(input.data).toBeUndefined()
  expect(input.inputType).toBeUndefined()
});