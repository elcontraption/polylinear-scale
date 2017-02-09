(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var config = {};

/**
 * The compiled scale to return
 *
 * @param  {Number} value The number to scale
 * @return {Number}       The result
 */
function scale(value) {
  var domains = config.domain;
  var ranges = config.range;
  var rangeMin;
  var rangeMax;
  var domain;
  var range;
  var ratio;
  var result;
  var i = 0;

  /* eslint-disable no-sequences */
  while (i < domains.length - 1) {
    if (value >= domains[i] && value <= domains[i + 1]) {
      domain = [domains[i], domains[i + 1]], range = [ranges[i], ranges[i + 1]];
      break;
    }
    i++;
  }

  // Value is outside given domain
  if (domain === undefined) {
    if (value < domains[0]) {
      domain = [domains[0], domains[1]];
      range = [ranges[0], ranges[1]];
    } else {
      domain = [domains[domains.length - 2], domains[domains.length - 1]];
      range = [ranges[ranges.length - 2], ranges[ranges.length - 1]];
    }
  }

  ratio = (range[1] - range[0]) / (domain[1] - domain[0]);
  result = range[0] + ratio * (value - domain[0]);

  if (config.clamp) {
    rangeMin = Math.min(range[0], range[1]);
    rangeMax = Math.max(range[0], range[1]);
    result = Math.min(rangeMax, Math.max(rangeMin, result));
  }

  return result;
}

/**
 * A polylinear scale
 *
 * Supports multiple piecewise linear scales that divide a continuous domain and range.
 *
 * @param  {Array} domain     Two or more numbers
 * @param  {Array} range      Numbers equivalent to number in `domain`
 * @param  {Boolean} clamp    Enables or disables clamping
 * @return {Function}         Scale function
 */
function polylinearScale(domain, range, clamp) {
  domain = domain || [0, 1];
  range = range || [0, 1];
  clamp = clamp || false;

  if (domain.length !== range.length) {
    throw new Error('polylinearScale requires domain and range to have an equivalent number of values');
  }

  config.domain = domain;
  config.range = range;
  config.clamp = clamp;

  return scale;
}

module.exports = polylinearScale;

})));