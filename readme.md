# Highwire

High level HTTP methods that are easy to build upon.

[![Code Climate](https://codeclimate.com/github/kkemple/highwire/badges/gpa.svg)](https://codeclimate.com/github/kkemple/highwire)
[![Test Coverage](https://codeclimate.com/github/kkemple/highwire/badges/coverage.svg)](https://codeclimate.com/github/kkemple/highwire/coverage)
[![Issue Count](https://codeclimate.com/github/kkemple/highwire/badges/issue_count.svg)](https://codeclimate.com/github/kkemple/highwire)
[![Circle CI](https://circleci.com/gh/kkemple/highwire.svg?style=svg)](https://circleci.com/gh/kkemple/highwire)

## Reasoning
[Superagent](https://visionmedia.github.io/superagent/) is a fantastic module, but I find that I generally need to wrap it up for use in a more functional approach. `Highwire` provides this functional approach through simple HTTP methods that work great for building complex network layers, or just to make syncing your React components easier. They are meant to be wrapped in higher order functions to build complex network logic.

## API
Highwire exposes an object with RESTful HTTP methods. Those methods are:

### get(url [, options: { headers, query } ])

  - url: full url of request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)
    - timeout: cancel request after specified timeout (throws Error)

```javascript
import { get } from 'highwire'
import { User } from './models'

const headers = { authorization: 'token <token>' }
const query = { sortOrder: 'desc' }
const timeout = 3000

get('/users', { headers, query, timeout })
  .then((response) => response.body)
  .then((body) => JSON.parse(body))
  .then((users) => console.log(users))
  .catch((err) => console.log(err))
```

### post(url, data [, options: { headers, query } ])

  - url: full url of request
  - data: body to send with request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)
    - timeout: cancel request after specified timeout (throws Error)
    - progress: function that is called on progress event of request; returns: `{ direction: string, lengthComputable: boolean, loaded: number, total: number }`

```javascript
import { post } from 'highwire'
import { User } from './models'

const headers = { authorization: 'token <token>' }
const timeout = 3000
const progress = (event) => console.log(event.loaded))
const user = new User({ name: 'highwire' })

post('/users', user.toJSON(), { headers, timeout, progress })
  .then((response) => response.body)
  .then((body) => JSON.parse(body))
  .then((user) => console.log(user))
  .catch((err) => console.log(err))
```

### put(url, data [, options: { headers, query } ])

  - url: full url of request
  - data: body to send with request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)
    - timeout: cancel request after specified timeout (throws Error)

```javascript
import { put } from 'highwire'
import { User } from './models'

const headers = { authorization: 'token <token>' }
const timeout = 3000

User.find({ name: 'highwire' })
  .then((user) => user.addScope('some-action'))
  .then((user) => put(`/users/${user.id}`, user.toJSON(), { headers, timeout }))
  .then((response) => response.body)
  .then((body) => JSON.parse(body))
  .then((user) => console.log(user))
  .catch((err) => console.log(err))
```

### patch(url, data [, options: { headers, query } ])

  - url: full url of request
  - data: body to send with request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)
    - timeout: cancel request after specified timeout (throws Error)

```javascript
import { patch } from 'highwire'
import { User } from './models'

const headers = { authorization: 'token <token>' }
const timeout = 3000

User.find({ name: 'highwire' })
  .then((user) => user.addScope('some-action'))
  .then((user) => patch(`/users/${user.id}`, user.toJSON(), { headers, timeout }))
  .then((response) => response.body)
  .then((body) => JSON.parse(body))
  .then((user) => console.log(user))
  .catch((err) => console.log(err))
```

### del(url, [, options: { headers, query } ])

  - url: full url of request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)
    - timeout: cancel request after specified timeout (throws Error)

```javascript
import { del } from 'highwire'
import { User } from './models'

const headers = { authorization: 'token <token>' }
const timeout = 3000

User.find({ name: 'highwire' })
  .then((user) => del(`/users/${user.id}`, { headers, timeout }))
  .then(() => console.log('user deleted'))
  .catch((err) => console.log(err))
```

### multipart(url, { meta: fields, attachments } [, options: { headers, query, progress }])

- url: full url of request
- meta:
  - fields[[name, value]] any form fields to attach to request
  - attachments[[name, path, filename]]: any attachments to attach to request
    - [superagent docs](https://visionmedia.github.io/superagent/#multipart-requests)
- options:
  - headers: object of headers to attatch to request
  - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)
  - timeout: cancel request after specified timeout (throws Error)
  - progress: function that is called on progress event of request; returns: `{ direction: string, lengthComputable: boolean, loaded: number, total: number }`

```javascript
const attachments = [
  ['profile', './tmp/profile.jpg'],
]
const progress = (event) => console.log(event)
const timeout = 5000

User.find({ name: 'highwire' })
  .then((user) =>
    multipart(
      `/users/${user.id}/profile`,
      { attachments },
      { progress, timeout },
    )
  .then((response) => JSON.parse(response.body))
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
```
