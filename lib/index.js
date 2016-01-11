import * as httpMethods from './http-methods'

function createHighwire() {
  return Object.assign({}, httpMethods)
}

module.exports = createHighwire
