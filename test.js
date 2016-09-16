const chai = require('chai')

global.chai = chai
global.expect = global.chai.expect

const polylinearScale = require('./')
const name = 'polylinearScale'
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
    expect(polylinearScale([-10, -5, 43], [-100, 0, 10])(4)).to.be.closeTo(1.875, precision)
    expect(polylinearScale([-74.562, 7.345, 99.1], [-1, 3, 234239])(489.5)).to.be.closeTo(1230868.4414473327, precision)
  })

  it('should support values outside the given domain or range', () => {
    expect(polylinearScale([0, 100], [0, 10])(101)).to.be.closeTo(10.1, precision)
    expect(polylinearScale([0, 100], [0, 10])(-1)).to.equal(-0.1)
    expect(polylinearScale([-6078.9, 0, 400], [-16.7, 3, 10])(506)).to.be.closeTo(11.854999999999999, precision)
  })

  it ('should support clamping values outside of the given domain or range', () => {
    expect(polylinearScale([0, 100], [0, 10], true)(101)).to.equal(10)
    expect(polylinearScale([0, 100], [0, 10], true)(-98)).to.equal(0)
    expect(polylinearScale([-167, -4.6, 430], [-18, 8, 106], true)(498)).to.equal(106)
    expect(polylinearScale([-189, -4.6, 30.7], [-1.22225, 77.5, 106], true)(-9901)).to.equal(-1.22225)
    expect(polylinearScale([-300, 0, 300], [0.5, 0.8, 0.5], true)(100)).to.be.closeTo(0.7000000000000001, precision)
    expect(polylinearScale([-1000, 0, 1000], [500, 0, 500], true)(0.046314659954703075)).to.be.closeTo(0.023157329977351537, precision)
  })
})
