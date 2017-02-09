# polylinear-scale

Create piecewise linear scales à la [d3](https://github.com/d3/d3-scale#continuous_domain):

> Although continuous scales typically have two values each in their domain and range, specifying more than two values produces a piecewise scale.

- Supports domains and ranges with more than two values each.
- Supports clamping to range.

For many more features, see [d3-scale](https://github.com/d3/d3-scale).

For an even simpler version that does not support multiple piecewise scales, see [simple-linear-scale](https://github.com/mapbox/simple-linear-scale).

## Setup
As a Node.js module:
```sh
$ yarn add polylinear-scale

# or

$ npm install polylinear-scale
```

CDN version:
```html
<!-- Minified -->
<script src="https://unpkg.com/polylinear-scale/dist/polylinear-scale.min.js"></script>

<!-- Un-minified -->
<script src="https://unpkg.com/polylinear-scale/dist/polylinear-scale.js"></script>
```

## Arguments

- `domain (Array)`: The input domain (default is `[0, 1]`).
- `range (Array)`: The output range (default is `[0, 1]`).
- `clamp (Boolean)`: Enable or disable clamping (default is `false`).

## Returns

- `(Function)`: The resulting scaling function.

## Examples
```js
const polylinearScale = require('polylinear-scale')

// Create a linear scale
const linear = polylinearScale([0, 1], [0, 100])
console.log(linear(0.5)) // 50

// Create a polylinear scale
const polylinear = polylinearScale([0, 100, 300], [0, 50, 100])
console.log(polylinear(10)) // 5
console.log(polylinear(-10)) // -5

// Clamp results to the given range
const clamped = polylinearScale([-10, 0, 10], [-5, 2, 10], true)
console.log(clamped(11)) // 10
```

## Contributing
Uses [JavaScript Standard Style](http://standardjs.com/).

```sh
# test
$ npm run test
```
