import Promise from 'bluebird'
import request from 'superagent'
import retryDecorator from 'superagent-retry'

Promise.config({ cancellation: true })
retryDecorator(request)

module.exports = (url, data = {}, {
  headers: headers = {},
  query: query = {},
  retries: retries = 0,
} = {}) => {
  return new Promise((res, rej, onCancel) => {
    const req = request.post(url)
      .set(headers)
      .query(query)
      .send(data)
      .retry(retries)
      .end((err, response) => {
        if (err) rej(err)
        else res(response)
      })

    onCancel(req.abort)
  })
}
