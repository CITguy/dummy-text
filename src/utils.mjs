/**
 * Calculate a positive integer `N` where `min ≤ N ≤ max`.
 *
 * Float arguments will be converted to integers via `Math.floor()`.
 *
 * @param {object} [config]
 * @param {number} [config.min=0]
 * @param {number} [config.max=1]
 * @return {integer}
 * @throws
 */
export function between(cfg={}) {
  let { min=0, max=1 } = cfg

  if (min > max) {
    throw 'min should be less than max'
  }

  // always return positive integer (0 ≤ min)
  let Min = (min < 0 ? 0 : Math.floor(min))
  let Max = Math.floor(max)

  // calculate random number `N` where `0 ≤ N ≤ max`
  let N = Math.floor(Math.random() * (Max + 1))

  // ensure that result `R` satisifies `Min ≤ R ≤ Max`
  return Math.max(Min, Math.min(N, Max))
}


/**
 * Interpolate a template string against a given context, using `{{prop}}`
 * as an insertion point for a contextual property.
 *
 * example: `'{{foo}}'` will be replaced with `context[foo]`
 *
 * @param {string} template
 * @param {object} [context={}]
 * @return {string}
 */
export function interpolate(template, context={}) {
  // see https://regex101.com/r/S9MdAe/1
  let regVar = /({{[^}]*\b}})/g; // {{var}}

  let result = template.replace(regVar, (match) => {
    let prop = match.replace(/[{}]/g, '') // {{foo}} -> foo
    // return value from context (if it exists), else return original match
    return context[prop] ? context[prop] : match
  })

  return result
}
