import Promise from 'bluebird'
import request from 'superagent'
import retryDecorator from 'superagent-retry'

Promise.config({ cancellation: true })
retryDecorator(request)

module.exports = (url, {
  headers: headers = {},
  query: query = {},
  retries: retries = 0,
} = {}) => {
  return new Promise((res, rej, onCancel) => {
    const req = request.delete(url)
      .set(headers)
      .query(query)
      .retry(retries)
      .end((err, response) => {
        if (err) rej(err)
        else res(response)
      })

    onCancel(req.abort)
  })
}
