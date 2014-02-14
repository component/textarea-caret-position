/* jshint browser: true */

var camelize = require('to-camel-case');

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

  var style = div.style;
  var computed = getComputedStyle(textarea);

  style.position = 'absolute';
  style.whiteSpace = 'pre-wrap';
  style.bottom = style.left = '-9999px';
  style.overflow = 'hidden';
  style.width = textarea.clientWidth
    + parseInt(computed.getPropertyValue('border-left-width'))
    + 'px';
  style.height = textarea.clientHeight
    + parseInt(computed.getPropertyValue('border-top-width'))
    + 'px';

  // transfer textarea properties to the div
  properties.forEach(function (prop) {
    style[camelize(prop)] = computed.getPropertyValue(prop);
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