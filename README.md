# Textarea Caret Position

Get the `top` and `left` coordinates of the caret in a `<textarea>` or
`<input type="text">`, in pixels. Useful for textarea autocompletes like
GitHub or Twitter, or for single-line autocompletes like the name drop-down
in Facebook or the company dropdown on Google Finance.

How it's done: a faux `<div>` is created off-screen and styled exactly like the
`textarea` or `input`. Then, the text of the element up to the caret is copied
into the `div` and a `<span>` is inserted right after it. Then, the text content
of the span is set to the remainder of the text in the textarea, in order to
faithfully reproduce the wrapping in the faux `div`. The same is done for the
`input` to simplify the code, though it makes no difference.

## Demo

Check out the [JSFiddle](http://jsfiddle.net/dandv/aFPA7/)
or the [test.html](http://rawgit.com/component/textarea-caret-position/master/test/index.html).

## Features

* supports `<textarea>`s and `<input type="text">` elements
* pixel precision
* RTL (right-to-left) support
* no dependencies whatsoever
* browser compatibility: Chrome, Safari, Firefox (despite [two](https://bugzilla.mozilla.org/show_bug.cgi?id=753662) [bugs](https://bugzilla.mozilla.org/show_bug.cgi?id=984275) it has), Opera, IE9+
* supports any font family and size, as well as text-transforms
* the text area can have arbitrary padding or borders
* not confused by horizontal or vertical scrollbars in the textarea
* supports hard returns, tabs (except on IE) and consecutive spaces in the text
* correct position on lines longer than the columns in the text area
* [no problem](http://archive.today/F4XCV#13402035) getting the correct position when the input text is scrolled (i.e. the first visible character is no longer the first in the text)
* no ["ghost" position in the empty space](https://github.com/component/textarea-caret-position/blob/06d2197f85f96405b43724e56dc56f220c0092a5/test/position_off_after_wrapping_with_whitespace_before_EOL.gif) at the end of a line when wrapping long words in a `<textarea>`


## API

```js
var getCaretCoordinates = require('textarea-caret');

document.querySelector('textarea').addEventListener('input', function () {
  var coordinates = getCaretCoordinates(this, this.selectionEnd);
  console.log(coordinates.top);
  console.log(coordinates.left);
})
```

### var coordinates = getCaretCoordinates(element, position)

`position` is an integer indicating the location of the caret. You basically pass `this.selectionStart` or `this.selectionEnd`. This way, this library isn't opinionated about what the caret is.

`coordinates` is an object of the form `{top: , left: }`.

## Known issues

* Tab characters in `<textarea>`s aren't supported in IE9 (issue #14)

## Dependencies

None.

## TODO

* Add tests.
* Consider adding [IE-specific](http://geekswithblogs.net/svanvliet/archive/2005/03/24/textarea-cursor-position-with-javascript.aspx) [code](http://stackoverflow.com/questions/16212871/get-the-offset-position-of-the-caret-in-a-textarea-in-pixels) if it avoids the necessity of creating the mirror div and might fix #14.
* Test IE8 support with `currentStyle`.

## Implementation notes

For the same textarea of 25 rows and 40 columns, Chrome 33, Firefox 27 and IE9 return completely different values
for `computed.width`, `textarea.offsetWidth`, and `textarea.clientWidth`. Here, `computed` is `getComputedStyle(textarea)`:

Chrome 33
* `computed.width `: "240px" = the text itself, no borders, no padding, no scrollbars
* `textarea.clientWidth`: 280 = computed.width + padding-left + padding-right
* `textarea.offsetWidth`: 327 = clientWidth + scrollbar (15px) + border-left + border-right

IE 9: scrollbar looks 16px, the text itself in the text area is 224px wide
* `computed.width`: "241.37px" = text only + sub-pixel scrollbar? (1.37px)
* `textarea.clientWidth`: 264
* `textarea.offsetWidth`: 313

Firefox 27
* `computed.width`: "265.667px"
* `textarea.clientWidth`: 249 - the only browser where textarea.clientWidth < computed.width
* `textarea.offsetWidth`: 338


## Contributors

* Dan Dascalescu ([dandv](https://github.com/dandv))
* Jonathan Ong ([jonathanong](https://github.com/jonathanong))
