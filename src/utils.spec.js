import * as Utils from './utils.mjs'
import { expect } from 'chai'

const ITERATIONS = [10, 100, 1000]
const noop = () => {}

function iterate(count=10, callback=noop) {
  let _count = count
  while (_count > 0) {
    callback()
    _count--
  }
}

describe('Utils', function () {
  describe('#between', function () {
    let fn = Utils.between

    it('should exist', function () {
      expect(fn).to.exist
    })

    ITERATIONS.forEach(totalIterations => {
      context(`over ${totalIterations} iterations`, function () {
        // 0 ≤ N ≤ 1
        context('with default configuration', function () {
          let fn = () => Utils.between()

          it('should return either 0 or 1', function () {
            iterate(totalIterations, () => {
              expect(fn()).to.be.within(0, 1)
            })
          })
        })

        // 1 ≤ N ≤ 1
        context('when { min: 1, max: 1 }', function () {
          let fn = () => Utils.between({ min: 1, max: 1 })

          it('should return 1', function () {
            iterate(totalIterations, () => {
              expect(fn()).to.equal(1)
            })
          })
        })

        // 5 ≤ N ≤ 10
        context('when { min: 5, max: 10 }', function () {
          let min = 5, max = 10
          let fn = () => Utils.between({ min, max })
          it(`should be between ${min} and ${max}`, function () {
            iterate(totalIterations, () => {
              expect(fn()).to.be.within(min, max)
            })
          })
        })

        // -1 ≤ N --(normalizeTo)--> 0 ≤ N
        context('when { min: -1 }', function () {
          let fn = () => Utils.between({ min: -1 })

          it('should be at least 0', function () {
            iterate(totalIterations, () => {
              expect(fn()).to.be.at.least(0)
            })
          })
        })

        // 10 ≤ N ≤ 1 (impossible)
        context('when { min: 10, max: 1 }', function () {
          it('should throw an error', function () {
            iterate(totalIterations, () => {
              expect(() => {
                return Utils.between({ min: 10, max: 1 })
              }).to.throw()
            })
          })
        })

        // 1.9 ≤ N ≤ 5.9 --(normalizeTo)--> 1 ≤ N ≤ 5
        context('when { min: 1.9, max: 5.9 }', function () {
          let fn = () => Utils.between({ min: 1.9, max: 5.9 })

          it('should be between 1 and 5', function () {
            iterate(totalIterations, () => {
              expect(fn()).to.be.within(1, 5)
            })
          })
        })
      })
    })
  })

  describe('#interpolate', function () {
    let fn = Utils.interpolate

    it('should exist', function () {
      expect(fn).to.exist
    })

    context('with static template', function () {
      let template = 'The quick brown fox jumps over the lazy dog.'

      it('should return the same string', function () {
        expect(fn(template)).to.equal(template)
      })
    })

    context('with dynamic template', function () {
      let template = 'I like {{noun}} and more {{noun}}'

      context('and empty context', function () {
        let context = {}
        it('should return the template string', function () {
          let result = fn(template, {})
          expect(result).to.equal(template)
        })
      })

      context('and non-matching context', function () {
        let context = { foo: 'bar' }
        it('should return the template string', function () {
          let result = fn(template, context)
          expect(result).to.equal(template)
        })
      })

      context('and matching context', function () {
        let context = { noun: 'pie' }
        it('should return the template string', function () {
          let result = fn(template, context)
          expect(result).to.equal('I like pie and more pie')
        })
      })
    })
  })
})

