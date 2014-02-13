/* jshint browser: true */

var css = require('css');

// the properties that we copy into a mirrored div
var properties = [
  'border-width',
  'font-family',
  'font-size',
  'font-style',
  'font-variant',
  'font-weight',
  'letter-spacing',
  'word-spacing',
  'line-height',
  'text-decoration',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
];

module.exports = function (textarea, position) {
  // mirrored div
  var div = document.createElement('div');
  document.body.appendChild(div);
  css(div, {
    position: 'absolute',
    'white-space': 'pre-wrap',
    bottom: '-9999px',
    left: '-9999px',
    // don't include scroll bars in size calculations
    overflow: 'hidden',
    width: textarea.clientWidth
      + parseInt(css(textarea, 'border-left-width'))
      + 'px',
    height: textarea.clientHeight
      + parseInt(css(textarea, 'border-top-width'))
      + 'px',
  });

  // transfer textarea properties to the div
  properties.forEach(function (prop) {
    css(div, prop, css(textarea, prop));
  });

  div.textContent = textarea.value.substring(0, position);

  var span = document.createElement('span');
  span.innerHTML = '&nbsp;';
  div.appendChild(span);

  var position = {
    top: span.offsetTop,
    left: span.offsetLeft,
  };

  document.body.removeChild(div);

  return position;
}