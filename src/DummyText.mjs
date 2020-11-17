import { between, interpolate } from './utils.mjs'
import DictionaryProxy from './DictionaryProxy.mjs'

/**
 * Instantiate a new DummyText generator with a custom JSON dictionary.
 */
// TODO: write unit tests
export default class DummyText {
  /**
   * @param {object} dict - JSON dictionary
   */
  constructor(dict) {
    if (!dict) {
      throw 'DummyText must be instantiated with a JSON dictionary'
    }
    this.dict = dict
  }

  /**
   * @prop {object} - proxy to the JSON dictionary
   */
  get vocab() {
    if (!this._vocab) {
      // Memoize a DictionaryProxy
      // Proxy object returns a random entry for the requested property.
      // Example: vocab.noun () => rawVocab.noun[randomIndex]
      this._vocab = new Proxy(this.dict, DictionaryProxy)
    }

    return this._vocab
  }

  // TODO: document -- "{{prop}}" replaced by vocab[prop]
  get sentence() {
    // see https://regex101.com/r/S9MdAe/1
    let regVar = /({{[^}]*\b}})/g; // {{var}}

    let template = this.vocab.sentence

    if (!template) {
      return ''
    }

    let interpolated = interpolate(this.vocab.sentence, this.vocab)

    /*
    let interpolated = this.vocab.sentence.replace(regVar, (match) => {
      let prop = match.replace(/[{}]/g, '') // {{foo}} -> foo
      return this.vocab[prop] // vocab[foo]
    })
    */

    // Ensure sentence starts with capital letter.
    let result = interpolated.replace(/^./, (match) => match.toUpperCase())

    return result
  }

  // TODO: make paragraph min/max configurable?
  get paragraph() {
    let _paragraph = []
    let limit = between(3, 6)
    while(limit--) {
      _paragraph.push(this.sentence)
    }
    // 2 spaces between each sentence
    return _paragraph.join('  ')
  }
}
