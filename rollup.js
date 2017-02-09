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
    })
  ]
}

rollup.rollup(config).then(bundle => {
  bundle.write({
    format: 'umd',
    moduleName: 'PolylinearScale',
    dest: 'dist/polylinear-scale.js'
  })
}).catch(err => console.error(err.stack))

// config.plugins.push(resolve({
//   jsnext: true,
//   main: true
// }))

// config.plugins.push(commonjs())
//
// rollup.rollup(config).then(bundle => {
//   bundle.write({
//     format: 'iife',
//     moduleName: 'PolylinearScale',
//     dest: 'dist/polylinear-scale.pkgd.js'
//   })
// }).catch(err => console.error(err.stack))
