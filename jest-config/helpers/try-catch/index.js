import { errorLogger } from "./error-logger.js"

/**
 * Try catch wrapper for Jest tests
 *
 * @param {function} func - test function
 */

export const tryCatchWrapper = function(func) {
  return async function() {
    try {
      await func.apply(this, arguments)
    } catch (e) {
      errorLogger(e)
    }
  }
}
