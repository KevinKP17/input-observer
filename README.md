# Purpose
the current native browsers doesn't have a way to groups all kinds of events from input. e.g: copy, paste, input, focus, etc. this plugin helps to grouping all kinds of events from input or textarea.

# Usage
``` javascript
import { InputObserver } from "input-observer";

const element = document.querySelector("#editor");
const observer = new InputObserver(
  // callback
  (data) => {console.log(data);},
  { rawFormat: true, timestampDivider: 1 }
)
observer.observe(element);
```

