const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const rollup = require('rollup')

let config = {
  entry: 'src/index.js',
  plugins: [
    babel({
      presets: ['es2015-rollup'],
      babelrc: false
    }),
    commonjs()
  ]
}

rollup.rollup(config).then(bundle => {
  bundle.write({
    format: 'iife',
    moduleName: 'PolylinearScale',
    dest: 'dist/polylinear-scale.js'
  })
}).catch(err => console.error(err.stack))
