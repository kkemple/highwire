import request from 'superagent'

function get(url, {
  headers: headers = {},
  query: query = {},
} = {}) {
  return new Promise((res, rej) => {
    const req = request.get(url)
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
} = {}) {
  return new Promise((res, rej) => {
    const req = request.delete(url)
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
  progress: progress = () => {},
} = {}) {
  return new Promise((res, rej) => {
    const req = request.post(url)
      .on('progress', progress)
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
} = {}) {
  return new Promise((res, rej) => {
    const req = request.patch(url)
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
} = {}) {
  return new Promise((res, rej) => {
    const req = request.put(url)
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
  progress: progress = () => {},
} = {}) {
  return new Promise((res, rej) => {
    const req = request.post(url)
      .on('progress', progress)
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
