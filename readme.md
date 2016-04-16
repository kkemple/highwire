# Highwire

A high level HTTP client that is easy to build upon.

## Reasoning
[Superagent](https://visionmedia.github.io/superagent/) is a fantastic module, but I find that I generally need to wrap it up for use in a more functional approach. `Highwire` provides this functional approach through simple HTTP methods that work great for building complex network layers, or just to make syncing your React components easier. They are meant to be wrapped in higher order functions to build complex network logic.

## API
Highwire exposes an object with RESTful HTTP methods. Those methods are:

### get(url [, options: { headers, query } ])

  - url: full url of request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)

### post(url, data [, options: { headers, query } ])

  - url: full url of request
  - data: body to send with request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)
    - progress: function that is called on progress event of request; returns: `{ direction: string, lengthComputable: boolean, loaded: number, total: number }`

### put(url, data [, options: { headers, query } ])

  - url: full url of request
  - data: body to send with request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)

### patch(url, data [, options: { headers, query } ])

  - url: full url of request
  - data: body to send with request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)

### del(url, [, options: { headers, query } ])

  - url: full url of request
  - options:
    - headers: object of headers to attatch to request
    - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)

### multipart(url, { meta: fields, attachments } [, options: { headers, query, progress }])

- url: full url of request
- meta:
  - fields[[name, value]] any form fields to attach to request
  - attachments[[name, path, filename]]: any attachments to attach to request
    - [superagent docs](https://visionmedia.github.io/superagent/#multipart-requests)
- options:
  - headers: object of headers to attatch to request
  - query: object of query parameters to attach to request (DO NOT USE: if url contains query params)
  - progress: function that is called on progress event of request; returns: `{ direction: string, lengthComputable: boolean, loaded: number, total: number }`



## Examples

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

// ... more advanced redux/thunk example using higher order functions

import assign from 'lodash.assign'
import throttle from 'lodash.throttle'
import { get } from 'highwire'

/* action types */
const REPOS_REQUEST = 'REPOS_REQUEST'
const REPOS_REQUEST_SUCCESS = 'REPOS_REQUEST_SUCCESS'
const REPOS_REQUEST_ERROR = 'REPOST_REQUEST_ERROR'
const REPOS_REQUEST_CANCELLED = 'REPOST_REQUEST_CANCELLED'

/* action creators */
export const fetchRepos = throttle(function fetchRepos() {
  return (dispatch) => {
    dispatch({ type: REPOS_REQUEST })

    const headers = { authorization: `token ${process.env.GITHUB_AUTH_TOKEN}` }

    get('https://api.github.com/repos', { headers })
      .then((response) => JSON.parse(response.body))
      .then((repos) => dispatch({ type: REPOS_REQUEST_SUCCESS, payload: repos }))
      .catch((err) => dispatch({ type: REPOS_REQUEST_ERROR, error: err }))
  }
}, 1000 * 5)

/* reducer */
const defaultState = {
  isComplete: false,
  hasError: false,
  isWorking: false,
  errorMessage: undefined,
  repos: [],
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
  case REPOS_REQUEST:
    return assign({}, state, {
      isWorking: true,
      isComplete: false,
      hasError: false,
    })
  case REPOS_REQUEST_SUCCESS:
    return assign({}, state, {
      isWorking: false,
      isComplete: true,
      repos: action.payload.repos,
    })
  case REPOS_REQUEST_ERROR:
    return assign({}, state, {
      isWorking: false,
      isComplete: false,
      hasError: true,
      errorMessage: action.error.message,
    })
  default:
    return state
  }
}

// sending multipart form data example
const attachments = [
  ['test', './fixtures/example.txt'],
]
const progress = (event) => console.log(event)

multipart('http://some.url/submit', { attachments }, { progress })
  .then((response) => JSON.parse(response.body))
  .then((data) => console.log(data))
  .catch((err) => console.log(err))

```
