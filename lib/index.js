import assign from 'lodash.assign'

import * as httpMethods from './http-methods'

function createHighwire() {
  return assign({}, httpMethods)
}

module.exports = createHighwire
