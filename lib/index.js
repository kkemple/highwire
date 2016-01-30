import get from './http-methods/get'
import post from './http-methods/post'
import put from './http-methods/put'
import patch from './http-methods/patch'
import del from './http-methods/delete'
import multipart from './http-methods/multipart'

function createHighwire() {
  return { get, post, put, patch, del, multipart }
}

module.exports = createHighwire
