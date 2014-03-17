/* jshint browser: true */

// The properties that we copy into a mirrored div.
// Note that some browsers, such as Firefox,
// do not concatenate properties, i.e. padding-top, bottom etc. -> padding,
// so we have to do every single property specifically.
var properties = [
  'box-sizing',
  'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  'height',
  'overflow-x',
  'overflow-y',  // copy the scrollbar for IE

  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',

  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',

  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  'font-style',
  'font-variant',
  'font-weight',
  'font-stretch',
  'font-size',
  'line-height',
  'font-family',

  'text-align',
  'text-transform',
  'text-indent',
  'text-decoration',  // might not make a difference, but better be safe

  'letter-spacing',
  'word-spacing'
];

var isFirefox = !(window.mozInnerScreenX == null);
module.exports = function (textarea, position, recalculate) {
  // mirrored div
  var div = document.createElement('div');
  div.id = 'textarea-caret-position-mirror-div';
  document.body.appendChild(div);

  var style = div.style;
  var computed = getComputedStyle(textarea);

  // default textarea styles
  style.whiteSpace = 'pre-wrap';
  style.wordWrap = 'break-word';

  // position off-screen
  style.position = 'absolute';  // required to return coordinates properly
  style.visibility = 'hidden';  // not 'display: none' because we want rendering

  // transfer textarea properties to the div
  properties.forEach(function (prop) {
    style[camelize(prop)] = computed.getPropertyValue(prop);
  });

  if (isFirefox) {
    style.width = parseInt(computed.width) - 2 + 'px'  // Firefox adds 2 pixels to the padding - https://bugzilla.mozilla.org/show_bug.cgi?id=753662
    // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    if (textarea.scrollHeight > parseInt(computed.height))
      style.overflowY = 'scroll';
  } else {
    style.overflow = 'hidden';  // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
  }  

  div.textContent = textarea.value.substring(0, position);

  var span = document.createElement('span');
  // Wrapping must be replicated *exactly*, including when a long word gets
  // onto the next line, with whitespace at the end of the line before (#7).
  // The  *only* reliable way to do that is to copy the *entire* rest of the
  // textarea's content into the <span> created at the caret position.
  span.textContent = textarea.value.substring(position);
  div.appendChild(span);

  var coordinates = {
    top: span.offsetTop + parseInt(computed.getPropertyValue('border-top-width')),
    left: span.offsetLeft + parseInt(computed.getPropertyValue('border-left-width')),
  };

  document.body.removeChild(div);

  return coordinates;
}

function camelize(string) {
  return string.replace(/[_-](\w)/g, function (matched, letter) {
    return letter.toUpperCase()
  })
}

/**** Implementation notes ****

For the same textarea of 40 columns, Chrome 33, Firefox 27 and IE9 return completely different values
for computed.width, textarea.offsetWidth, and textarea.clientWidth. No two are alike:

Chrome
>> computed.width  // getComputedStyle(textarea)
"240px" = the text itself, no borders, no padding, no scrollbars
>> textarea.clientWidth
280 = computed.width + padding-left + padding-right
>> textarea.offsetWidth
327 = clientWidth + scrollbar (15px) + border-left + border-right

IE: scrollbar is 16px, text-only is 224px
>> computed.width
"241.37px" = text only + scrollbar?? + 1.37px?!
>> textarea.clientWidth 
264
>> textarea.offsetWidth
313 

FF 27
>> computed.width
"265.667px"
>> textarea.clientWidth
249 - the only browser where textarea.clientWidth < computed.width
>> textarea.offsetWidth
338


*/
