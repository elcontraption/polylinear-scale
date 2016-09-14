const chai = require('chai')

global.chai = chai
global.expect = global.chai.expect

const polylinearScale = require('./')
const name = polylinearScale.name
const precision = 0.0000001

describe('#polylinearScale()', function () {
  it('should set a default domain of [0, 1] and range of [0, 1]', () => {
    const scale = polylinearScale()
    expect(scale(1)).to.equal(1)
    expect(scale(2)).to.equal(2)
  })

  it('should require `domain` and `range` to have an equivalent number of values', () => {
    const err = `${name} requires domain and range to have an equivalent number of values`
    expect(() => { polylinearScale([0, 1, 2], [0, 1]) }).to.throw(err)
    expect(() => { polylinearScale([0, 1], [0, 1, 2]) }).to.throw(err)
  })

  it('should return a function', () => {
    const test = polylinearScale([0, 1], [0, 1])
    expect(test).to.be.a('function')
  })

  it('should support a simple linear scale', () => {
    expect(polylinearScale([0, 10000], [0, 100])(1)).to.equal(0.01)
    expect(polylinearScale([0, 100], [0, 10])(1)).to.equal(0.1)
    expect(polylinearScale([0, 250], [0, 33])(9.5)).to.be.closeTo(1.254, precision)
    expect(polylinearScale([-36, 5.6], [4, 65])(8)).to.be.closeTo(68.5192307692, precision)
  })

  it('should support multiple piecewise scales', () => {
    expect(polylinearScale([-600, 0, 400], [-10, 0, 10])(400)).to.equal(10)
  })
})