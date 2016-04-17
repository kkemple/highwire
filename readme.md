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

### post(url, data [, options: { headers, query } ])

  - url: full url of request
  - data: body to send with request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)
    - timeout: cancel request after specified timeout (throws Error)
    - progress: function that is called on progress event of request; returns: `{ direction: string, lengthComputable: boolean, loaded: number, total: number }`

### put(url, data [, options: { headers, query } ])

  - url: full url of request
  - data: body to send with request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)
    - timeout: cancel request after specified timeout (throws Error)

### patch(url, data [, options: { headers, query } ])

  - url: full url of request
  - data: body to send with request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)
    - timeout: cancel request after specified timeout (throws Error)

### del(url, [, options: { headers, query } ])

  - url: full url of request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)
    - timeout: cancel request after specified timeout (throws Error)

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



## Example

```javascript
import React from 'react'
import { get } from 'highwire'

const headers = { authorization: `token ${process.env.GITHUB_AUTH_TOKEN}` }

export default React.createClass({
  componentWillMount() {
    // fetch some repos
    get('https://api.github.com/repos', { headers })
      .then((response) => JSON.parse(response.body))
      .then((repos) => this.setState({ repos }))
      .catch((err) => this.setState({ err }))
  },

  render() {
    const { repos, err } = this.state

    if (err) return (
      <div className="error">{err.message}</div>
    )

    return (
      <div className="repos">
        <ul>
          {
            repos.length ?
              repos.map(repo => <li>{repo.name}</li>) :
              <li>No repos found...</li>
          }
        </ul>
      </div>
    )
  },
})

// sending multipart form data example
const attachments = [
  ['test', './fixtures/example.txt'],
]
const progress = (event) => console.log(event)
const timeout = 5000

multipart('http://some.url/submit', { attachments }, { progress, timeout })
  .then((response) => JSON.parse(response.body))
  .then((data) => console.log(data))
  .catch((err) => console.log(err))

```
