import Promise from 'bluebird'
import request from 'superagent'
import retryDecorator from 'superagent-retry'

Promise.config({ cancellation: true })
retryDecorator(request)

module.exports = (url, {
  attachments = [],
  fields = [],
} = {}, {
  headers: headers = {},
  query: query = {},
  progress: progress = () => {},
  retries: retries = 0,
} = {}) => {
  return new Promise((res, rej, onCancel) => {
    const req = request.post(url)
      .on('progress', progress)
      .set(headers)
      .query(query)
      .retry(retries)

    attachments.forEach((attachment) => req.attach(...attachment))
    fields.forEach((field) => req.field(...field))

    req.end((err, response) => {
      if (err) rej(err)
      else res(response)
    })

    onCancel(req.abort)
  })
}
