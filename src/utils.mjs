/**
 * Calculate a positive integer `N` where `min ≤ N ≤ max`.
 *
 * Float arguments will be converted to integers via `Math.floor()`.
 *
 * @param {number} [min=0]
 * @param {number} [max=1]
 * @return {integer}
 */
// TODO: write unit tests
export function between(min=0, max=1) {
  // always return positive integer (0 ≤ min)
  let Min = (min < 0 ? 0 : Math.floor(min))
  let Max = Math.floor(max)

  // calculate random number `N` where `0 ≤ N ≤ max`
  let N = Math.floor(Math.random() * (Max + 1))

  // ensure that result `R` satisifies `Min ≤ R ≤ Max`
  return Math.max(Min, Math.min(N, Max))
}
