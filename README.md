# Textarea Caret Position

Get the `top` and `left` coordinates of a caret in a `<textarea>`, in pixels.
Useful for textarea autocompletes like GitHub, Twitter etc.

How it's done: a faux `<div>` is created off-screen and styled exactly like the
textarea. Then, the text of the textarea up to the caret is copied into the div
and a `<span>` is inserted right after it. Then, the text content of the span is
set to the remainder of the text in the textarea, in order to faithfully 
reproduce the wrapping in the faux div.

## Features

* pixel precision
* no dependencies whatsoever
* supports any font family and size, as well as text-transforms
* the text area can have arbitrary padding or borders
* not confused by horizontal or vertical scrollbars in the textarea
* supports hard returns, tabs and consecutive spaces in the text
* correct position on lines longer than the columns in the text area
* no "ghost" position in the empty space at the end of a line when wrapping long words


## API

```js
var getPosition = require('textarea-caret-position');

document.querySelector('textarea').addEventListener('input', function () {
  var coordinates = getPosition(this, this.selectionEnd);
  console.log(coordinates.left);
  console.log(coordinates.right);
})
```

### var coordinates = getPosition(textarea, position)

`position` is a integer of the location of the caret. You basically pass `this.selectionStart` or `this.selectionEnd`. This way, this library isn't opinionated with what the caret is.

`coordinates` is an object of the form `{top: , left: }`.

## Caveats

None.

## Dependencies

None.

## TODO

* Add tests.
* Test IE compatibility - see [this](http://stackoverflow.com/questions/16212871/get-the-offset-position-of-the-caret-in-a-textarea-in-pixels). Consider adding IE-specific code if it avoids the necessity of creating the faux div.

## License

The MIT License (MIT)

Copyright (c) 2014 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
