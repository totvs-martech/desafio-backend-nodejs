'use strict'

const axios = require('axios')

let axiosInstance = null

module.exports = class Requester {
  static getAxiosInstance (headers) {
    if (!axiosInstance) {
      headers = headers || {
        'Content-Type': 'application/json'
      }
      axiosInstance = axios.create({ headers })
      axiosInstance.defaults.timeout = 15 * 1000
    }
    return axiosInstance
  }

  static getError (error) {
    if (error.response) {
      return `Status: ${error.response.status} ${error.response.statusText}: ${JSON.stringify(error.response.data)}`
    } else {
      return error.stack
    }
  }

  static URL_PATH (url, endPoint) {
    return `${url}/${endPoint}`
  }

  /**
   * Get all endpoint data
   * @param {body} body data filter
   */
  static getAll (urlEndpoint, endPoint, headers) {
    return new Promise(async (resolve, reject) => {
      const url = await Requester.URL_PATH(urlEndpoint, endPoint)
      Requester.getAxiosInstance(headers)
        .get(url)
        .then(data => {
          resolve(data.data)
        })
        .catch(err => {
          reject(Requester.getError(err))
        })
    })
  }

  /**
   * Create data about endpoint
   * @param {body} body is data
   */
  static create (urlEndpoint, endPoint, body, headers) {
    return new Promise((resolve, reject) => {
      const url = Requester.URL_PATH(urlEndpoint, endPoint)
      Requester.getAxiosInstance(headers)
        .post(url, body)
        .then(data => {
          resolve(data.data)
        })
        .catch(err => {
          reject(Requester.getError(err))
        })
    })
  }

  /**
   * Get specific data
   * @param {id} id about endpoint
   */
  static get (urlEndpoint, endPoint, id, headers) {
    return new Promise((resolve, reject) => {
      const url = Requester.URL_PATH(urlEndpoint, endPoint) + '/' + id
      Requester.getAxiosInstance(headers)
        .get(url)
        .then(data => {
          resolve(data.data)
        })
        .catch(err => {
          reject(Requester.getError(err))
        })
    })
  }

  /**
   * Specific data update at endpoint
   * @param {id} id data specific
   * @param {body} body updated data
   */
  static update (urlEndpoint, endPoint, id, body) {
    return new Promise((resolve, reject) => {
      const url = Requester.URL_PATH(urlEndpoint, endPoint) + '/' + id
      Requester.getAxiosInstance()
        .put(url, body)
        .then(data => {
          resolve(data.data)
        })
        .catch(err => {
          reject(Requester.getError(err))
        })
    })
  }

  /**
   * Specific data update at endpoint
   * @param {id} id data specific
   * @param {body} body updated data
   */
  static updatePatch (urlEndpoint, endPoint, body, headers) {
    return new Promise((resolve, reject) => {
      const url = Requester.URL_PATH(urlEndpoint, endPoint)
      Requester.getAxiosInstance(headers)
        .patch(url, body)
        .then(data => {
          resolve(data.data)
        })
        .catch(err => {
          reject(Requester.getError(err))
        })
    })
  }

  /**
   * Remove specific data
   * @param {id} id data specific
   */
  static remove (urlEndpoint, endPoint, id, headers) {
    return new Promise((resolve, reject) => {
      const url = Requester.URL_PATH(urlEndpoint, endPoint) + '/' + id
      Requester.getAxiosInstance(headers)
        .delete(url)
        .then(data => {
          resolve(data.data)
        })
        .catch(err => {
          reject(Requester.getError(err))
        })
    })
  }
}
