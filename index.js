/* jshint browser: true */

// The properties that we copy into a mirrored div.
// Note that some browsers, such as Firefox,
// do not concatenate properties, i.e. padding-top, bottom etc. -> padding,
// so we have to do every single property specifically.
var properties = [
  'boxSizing',
  'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  'height',
  'overflowX',
  'overflowY',  // copy the scrollbar for IE

  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',

  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'lineHeight',
  'fontFamily',

  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration',  // might not make a difference, but better be safe

  'letterSpacing',
  'wordSpacing'
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
    style[prop] = computed[prop];
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
    top: span.offsetTop + parseInt(computed['borderTopWidth']),  // different ways of accessing computed's members
    left: span.offsetLeft + parseInt(computed.getPropertyValue('border-left-width'))
  };

  document.body.removeChild(div);

  return coordinates;
}
