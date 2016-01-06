import request from 'superagent'
import Promise from 'bluebird'

Promise.config({ cancellation: true })

export function get(url, {
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
        else res(response.body)
      })

    onCancel(req.abort)
  })
}

export function post(url, data = {}, {
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
        else res(response.body)
      })

    onCancel(req.abort)
  })
}

export function put(url, data = {}, {
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
        else res(response.body)
      })

    onCancel(req.abort)
  })
}

export function patch(url, data = {}, {
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
        else res(response.body)
      })

    onCancel(req.abort)
  })
}

export function del(url, {
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
        else res(response.body)
      })

    onCancel(req.abort)
  })
}
