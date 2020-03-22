/**
 * @flow
 */

/**
 * Request Error Class to help set a response code and message to display to the user
 * @type {RequestError}
 */
export default class RequestError extends Error {
  code: number;

  /**
   * Create a new Request Error
   * @param {string} msg  message to display when returned
   * @param {number} code response status code to set in Hapi Response
   */
  constructor(msg: string, code: number) {
    super(msg);
    this.code = code;
  }
}
