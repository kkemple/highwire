# Highwire

A high level HTTP client that is easy to build upon.

## Reasoning
I love [superagent](https://visionmedia.github.io/superagent/), but I find that I generally need to build more on top of it. Such as cancelable requests, throttling, and reties. `Highwire` provides simple HTTP methods that work great for building complex async network layers, or just to make syncing your React components easier...

```javascript
import React from 'react'
import highwireFactory from 'highwire'

const { get } = highwireFactory()
const headers = { authorization: `token ${process.env.GITHUB_AUTH_TOKEN}` }
const retries = 5

export default React.createClass({
  componentWillMount() {
    // fetch some repos
    this.reposRequest = get('https://api.github.com/repos', { headers, retries })
    this.reposRequest
      .then((response) => JSON.parse(response.body))
      .then((repos) => this.setState({ repos }))
      .catch((err) => this.setState({ err }))
  },

  componentWillUnmount() {
    // cancel promise chain and http request to github
    // has no affect if promise has resolved already
    this.reposRequest.cancel()
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

import highwireFactory from 'highwire'

const { get } = highwireFactory()
const headers = { authorization: `token ${process.env.GITHUB_AUTH_TOKEN}` }
const retries = 5
const getRepos = () => get('https://api.github.com/repos', { headers, retries })

const REPOS_REQUEST = 'REPOS_REQUEST'
const REPOS_REQUEST_SUCCESS = 'REPOS_REQUEST_SUCCESS'
const REPOS_REQUEST_ERROR = 'REPOST_REQUEST_ERROR'
const REPOS_REQUEST_CANCELLED = 'REPOST_REQUEST_CANCELLED'

const defaultState = {
  isComplete: false,
  hasError: false,
  isWorking: false,
  errorMessage: undefined,
  repos: [],
}

let currentRequest

export const fetchRepos = throttle(function fetchRepos() {
  return (dispatch) => {
    dispatch({ type: REPOS_REQUEST })

    currentRequest = getRepos()
      .then((response) => JSON.parse(response.body))
      .then((repos) => dispatch({ type: REPOS_REQUEST_SUCCESS, payload: repos }))
      .catch((err) => dispatch({ type: REPOS_REQUEST_ERROR, error: err }))
  }
}, 1000 * 5)

export const cancelFetchRepos = () => (dispatch) => {
  if (currentRequest) {
    currentRequest.cancel()
    dispatch({ type: REPOS_REQUEST_CANCELLED })
  }
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
  case REPOS_REQUEST:
    return assign({}, state, {
      isWorking: true,
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

  case REPOS_REQUEST_CANCELLED:
    return assign({}, state, {
      isWorking: false,
      isComplete: false,
      hasError: true,
    })

  default:
    return state
  }
}

```
