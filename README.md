# InputObserver
## Problem
Input event handlers are scattered and difficult to keep track.
the need to provide a quality of life in terms of data gathering on a input type element.

## Solution
a simple observer that wraps all kinds of data using existing native event handler.
this wrapper can be used to easily track and gather all kinds of events within an input or textarea elements.

## Usage
``` javascript
import { InputObserver } from "input-observer"

const element = document.querySelector("#editor")

const observer = new InputObserver(
  (data) => console.log(data) // do something here
)

observer.observe(element)
observer.unobserve()
```

## Available event
- [InputEvent](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent)
- [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent)

## Uniform event data
Data are received from callback

| Attribute   	| Value                                                       	                                                                                              |
|-------------	|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`      	| `string or null`<br>[InputEvent.data](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/data)                              	                     |
| `isTrusted` 	| `boolean`<br>[Event.isTrusted](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted)                                 	                         |
| `inputType` 	| `string`<br>e.g: "focus", "blur", "insertText"<br>[InputEvent.inputType](https://rawgit.com/w3c/input-events/v1/index.html#interface-InputEvent-Attributes)|
| `timeStamp` 	| `Date`                                       	                                                                                                             |