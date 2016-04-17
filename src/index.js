import request from 'superagent'

function get(url, {
  headers: headers = {},
  query: query = {},
  timeout: timeout = 0,
} = {}) {
  return new Promise((res, rej) => {
    request.get(url)
      .timeout(timeout)
      .set(headers)
      .query(query)
      .end((err, response) => {
        if (err) rej(err)
        else res(response)
      })
  })
}

function del(url, {
  headers: headers = {},
  query: query = {},
  timeout: timeout = 0,
} = {}) {
  return new Promise((res, rej) => {
    request.delete(url)
      .timeout(timeout)
      .set(headers)
      .query(query)
      .end((err, response) => {
        if (err) rej(err)
        else res(response)
      })
  })
}

function post(url, data = {}, {
  headers: headers = {},
  query: query = {},
  timeout: timeout = 0,
  progress: progress = () => {},
} = {}) {
  return new Promise((res, rej) => {
    request.post(url)
      .on('progress', progress)
      .timeout(timeout)
      .set(headers)
      .query(query)
      .send(data)
      .end((err, response) => {
        if (err) rej(err)
        else res(response)
      })
  })
}

function patch(url, data = {}, {
  headers: headers = {},
  query: query = {},
  timeout: timeout = 0,
} = {}) {
  return new Promise((res, rej) => {
    request.patch(url)
      .timeout(timeout)
      .set(headers)
      .query(query)
      .send(data)
      .end((err, response) => {
        if (err) rej(err)
        else res(response)
      })
  })
}

function put(url, data = {}, {
    headers: headers = {},
    query: query = {},
    timeout: timeout = 0,
} = {}) {
  return new Promise((res, rej) => {
    request.put(url)
      .timeout(timeout)
      .set(headers)
      .query(query)
      .send(data)
      .end((err, response) => {
        if (err) rej(err)
        else res(response)
      })
  })
}

function multipart(url, {
  attachments = [],
  fields = [],
} = {}, {
  headers: headers = {},
  query: query = {},
  timeout: timeout = 0,
  progress: progress = () => {},
} = {}) {
  return new Promise((res, rej) => {
    const req = request.post(url)
      .on('progress', progress)
      .timeout(timeout)
      .set(headers)
      .query(query)

    attachments.forEach((attachment) => req.attach(...attachment))
    fields.forEach((field) => req.field(...field))

    req.end((err, response) => {
      if (err) rej(err)
      else res(response)
    })
  })
}


module.exports = { get, post, put, patch, del, multipart }
