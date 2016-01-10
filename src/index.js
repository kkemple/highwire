import assign from 'lodash.assign'
import Promise from 'bluebird'
import request from 'superagent'

Promise.config({ cancellation: true })

function get(url, {
  headers: headers = {},
  query: query = {},
  progress: progress = () => {},
} = {}) {
  return new Promise((res, rej, onCancel) => {
    const req = request.get(url)
      .set(headers)
      .query(query)
      .on('progress', progress)
      .end((err, response) => {
        if (err) rej(err)
        else res(response)
      })

    onCancel(req.abort)
  })
}

function post(url, data = {}, {
  headers: headers = {},
  query: query = {},
  progress: progress = () => {},
} = {}) {
  return new Promise((res, rej, onCancel) => {
    const req = request.post(url)
      .set(headers)
      .query(query)
      .send(data)
      .on('progress', progress)
      .end((err, response) => {
        if (err) rej(err)
        else res(response)
      })

    onCancel(req.abort)
  })
}

function put(url, data = {}, {
    headers: headers = {},
    query: query = {},
    progress: progress = () => {},
} = {}) {
  return new Promise((res, rej, onCancel) => {
    const req = request.put(url)
      .set(headers)
      .query(query)
      .send(data)
      .on('progress', progress)
      .end((err, response) => {
        if (err) rej(err)
        else res(response)
      })

    onCancel(req.abort)
  })
}

function patch(url, data = {}, {
  headers: headers = {},
  query: query = {},
  progress: progress = () => {},
} = {}) {
  return new Promise((res, rej, onCancel) => {
    const req = request.patch(url)
      .set(headers)
      .query(query)
      .send(data)
      .on('progress', progress)
      .end((err, response) => {
        if (err) rej(err)
        else res(response)
      })

    onCancel(req.abort)
  })
}

function del(url, {
  headers: headers = {},
  query: query = {},
  progress: progress = () => {},
} = {}) {
  return new Promise((res, rej, onCancel) => {
    const req = request.delete(url)
      .set(headers)
      .query(query)
      .on('progress', progress)
      .end((err, response) => {
        if (err) rej(err)
        else res(response)
      })

    onCancel(req.abort)
  })
}

function multipart(url, {
  attachments = [],
  fields = [],
} = {}, {
  headers: headers = {},
  query: query = {},
  progress: progress = () => {},
} = {}) {
  const req = request.post(url)
    .set(headers)
    .query(query)
    .on('progress', progress)

  attachments.forEach(attachment => req.attach(...attachment))
  fields.forEach(field => req.field(...field))

  req.end((err, response) => {
    if (err) rej(err)
    else res(response)
  })

  onCancel(req.abort)
}

function createHighwire(opts = {}) {
  return assign({}, opts, { get, post, patch, put, del, multipart })
}

export default createHighwire
