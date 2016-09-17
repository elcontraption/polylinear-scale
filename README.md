# polylinear-scale

Create piecewise linear scales à la [d3](https://github.com/d3/d3-scale#continuous_domain):

> Although continuous scales typically have two values each in their domain and range, specifying more than two values produces a piecewise scale.

- Supports domains and ranges with more than two values each.
- Supports clamping to range.

For an even simpler version that does not support multiple piecewise scales, see [simple-linear-scale](https://github.com/mapbox/simple-linear-scale).

## Example

```js
const polylinearScale = require('polylinear-scale')

// linear scale
const linear = polylinearScale([0, 1], [0, 100])
console.log(linear(0.5)) // 50

// polylinear scale
const polylinear = polylinearScale([0, 100, 300], [0, 50, 100])
console.log(polylinear(10)) // 5
console.log(polylinear(-10)) // -5

// clamping
const clamped = polylinearScale([-10, 0, 10], [-5, 2, 10], true)
console.log(clamped(11)) // 10
```

## Contributing

```sh
# test
$ npm run test
```
