# Textarea Caret Position

Get the `top` and `left` coordinates of a caret in a textarea. Useful for textarea textcompletes like github, twitter, etc.

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

The position is off when the cursor is in a word that was wrapped off from the previous line due to being too long, and there is more whitespace at the end of the previous line than the column the cursor is at. Here's an [example](test/position_off_after_wrapping_with_whitespace_before_EOL.gif). Pull requests are welcome against [issue #7](https://github.com/component/textarea-caret-position/issues/7).

## License

The MIT License (MIT)

Copyright (c) 2014 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.