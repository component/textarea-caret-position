/* jshint browser: true */

// the properties that we copy into a mirrored div
var properties = [
  'box-sizing',
  'border-width',
  'padding',
  'font',
  'letter-spacing',
  'word-spacing',
  'line-height',
  'text-transform',
  'text-indent',
  'text-decoration',  // might not make a difference, but better be safe
];

module.exports = function (textarea, position) {
  // mirrored div
  var div = document.createElement('div');
  document.body.appendChild(div);

  var style = div.style;
  var computed = getComputedStyle(textarea);

  style.position = 'absolute';
  style.whiteSpace = 'pre-wrap';
  style.wordWrap = 'break-word';
  style.bottom = style.left = '-9999px';
  style.overflow = 'hidden';
  style.width = computed.width;    // exclude the scrollbar, so the mirror div
  style.height = computed.height;  // ...wraps exactly as the textarea does

  // transfer textarea properties to the div
  properties.forEach(function (prop) {
    style[camelize(prop)] = computed.getPropertyValue(prop);
  });

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