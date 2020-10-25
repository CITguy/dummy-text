/*
 * This is the heart of the library, a proxy handler for a custom JSON dictionary.
 *
 * Converts a JSON dictionary (whose properties all return an array), into an
 * object with the same properties, each of which return a random item from the
 * dictionary array.
 *
 * DICTIONARY:
 * {
 *   array<string> foo,
 *   array<string> bar,
 *   array<string> wizz,
 *   array<string> bang,
 * }
 *
 * PROXY:
 * {
 *   string foo,
 *   string bar,
 *   string wizz,
 *   string bang,
 * }
 */
// TODO: write unit tests
const DictionaryProxy = {
  get(target, prop) {
    // NOTE: assumes that target[prop] returns an array
    let _values = target[prop]
    if (_values.length > 0) {
      let idx = Math.floor(Math.random() * _values.length)
      return _values[idx]
    }
    return `<${prop.toUpperCase()}>`
  }
}


export default DictionaryProxy
