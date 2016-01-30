import get from './get'
import post from './post'
import put from './put'
import patch from './patch'
import del from './delete'
import multipart from './multipart'

function createHighwire() {
  return { get, post, put, patch, del, multipart }
}

module.exports = createHighwire
