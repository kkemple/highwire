# Highwire

A high level HTTP client that is easy to build upon.

## Reasoning
I love `superagent` but I find that I generally need to build more on top of it. Such as cancelable requests, throttling, and reties. Highwire exports HTTP method functions that work great for building complex async network layers, or just to make syncing your React components easier...

```javascript
import React from 'react'
import throttle from 'lodash.throttle'

import { get } from 'highwire'

const reposUrl = 'https://api.github.com/repos'
const headers = { 'Authorization': 'token <AUTH_TOKEN>' }
const throttledRepos = throttle(() => get(reposUrl, { headers }), 500)
let fetching = false
let currentRequest

export default React.createClass({
  componentWillMount() {
    fetching = true
    currentRequest = throttledRepos()
      .then((data) => this.setState({ repos: data }))
      .then(() => fetching = false)
      .catch(console.log)
  },

  componentWillUnmount() {
    if (fetching) currentRequest.cancel()
  },
})

```
