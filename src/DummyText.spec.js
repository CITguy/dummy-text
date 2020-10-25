import DummyText from './DummyText.mjs'
import { expect } from 'chai'

describe('DummyText', function () {
  let Klass = DummyText

  it('should exist', function () {
    expect(Klass).to.exist
  })

  describe('constructor', function () {
    describe('without config', function () {
      it('should fail to instantiate', function () {
        let instance
        let create = () => { instance = new Klass() }
        expect(create).to.throw()
        expect(instance).to.not.exist
      })
    })

    describe('with empty dict', function () {
      let dict = {}

      it('should instantiate', function () {
        let instance
        let create = () => { instance = new Klass(dict) }
        expect(create).to.not.throw()
        expect(instance).to.exist
      })

      describe('instance', function () {
        let instance = new Klass(dict)

        describe('.sentence', function () {
          it('should throw', function () {
            let getSentence = () => instance.sentence
            expect(getSentence).to.throw()
          })
        })

        // SKIPPED
        describe.skip('.paragraph', function () {
          it('should be blank', function () {
            let getParagraph = () => { return instance.paragraph }
            expect(getParagraph).to.throw(TypeError)
            expect(instance.paragraph).to.not.exist
          })
        })
      })
    })
  })

  describe('instance', function () {
    const DICT = {
      sentence: [ 'I am a plain-text sentence.' ],
    }
    let instance = new Klass(DICT)

    // should have expected properties
    it('should have expected properties', function () {
      expect(instance).to.have.property('dict')
      expect(instance).to.have.property('vocab')
      expect(instance).to.have.property('sentence')
    })


    /*
    describe('.dict', function () {
      it('should be set', function () {
        expect(instance.dict).to.equal(DICT)
      })
    })

    describe('.vocab', function () {
      let vocab = instance.vocab

      it('should exist', function () {
        expect(vocab).to.exist
      })

      // it should be a Proxy
      it('should be a proxy', function () {
        expect(vocab).to.be.a('proxy')
      })
    })
    */
  })
})
