import { between } from './utils.mjs'
import DictionaryProxy from './DictionaryProxy.mjs'

/**
 * Instantiate a new DummyText generator with a custom JSON dictionary.
 */
// TODO: write unit tests
export default class DummyText {
  /**
   * @param {object} config - JSON dictionary
   */
  constructor(config) {
    this.config = config
  }

  /**
   * @prop {object} - proxy to the JSON dictionary
   */
  get vocab() {
    if (!this._vocab) {
      // Memoize a DictionaryProxy
      // Proxy object returns a random entry for the requested property.
      // Example: vocab.noun () => rawVocab.noun[randomIndex]
      this._vocab = new Proxy(this.config, DictionaryProxy)
    }

    return this._vocab
  }

  // TODO: document - Understands "{prop}" syntax to insert a value from the dictionary proxy.
  get sentence() {
    let _sentence = this.vocab.sentence

    // see https://regex101.com/r/S9MdAe/1
    let regVar = /({{[^}]*\b}})/g; // {{var}}

    let interpolated = _sentence.replace(regVar, (match) => {
      let prop = match.replace(/[{}]/g, '')
      return this.vocab[prop]
    })

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
