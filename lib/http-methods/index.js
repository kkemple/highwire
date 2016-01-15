import Promise from 'bluebird'
import request from 'superagent'
import retryDecorator from 'superagent-retry'

Promise.config({ cancellation: true })
retryDecorator(request)

export function get(url, {
  headers: headers = {},
  query: query = {},
  retries: retries = 0,
} = {}) {
  return new Promise((res, rej, onCancel) => {
    const req = request.get(url)
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

export function post(url, data = {}, {
  headers: headers = {},
  query: query = {},
  retries: retries = 0,
} = {}) {
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

export function put(url, data = {}, {
    headers: headers = {},
    query: query = {},
    retries: retries = 0,

} = {}) {
  return new Promise((res, rej, onCancel) => {
    const req = request.put(url)
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

export function patch(url, data = {}, {
  headers: headers = {},
  query: query = {},
  retries: retries = 0,
} = {}) {
  return new Promise((res, rej, onCancel) => {
    const req = request.patch(url)
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

export function del(url, {
  headers: headers = {},
  query: query = {},
  retries: retries = 0,
} = {}) {
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

export function multipart(url, {
  attachments = [],
  fields = [],
} = {}, {
  headers: headers = {},
  query: query = {},
  progress: progress = () => {},
  retries: retries = 0,
} = {}) {
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
