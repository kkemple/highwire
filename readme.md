# Highwire

A high level HTTP client that is easy to build upon.

## Reasoning
I love [superagent](https://visionmedia.github.io/superagent/), but I find that I generally need to build more on top of it. Such as cancelable requests, throttling, and reties. `Highwire` exports simple HTTP method functions that work great for building complex async network layers, or just to make syncing your React components easier...

```javascript
import React from 'react'
import { get } from 'highwire'

const headers = { authorization: 'token <AUTH_TOKEN>' }

export default React.createClass({
  componentWillMount() {
    // fetch some repos
    this.reposRequest = get('https://api.github.com/repos', { headers })
    this.reposRequest
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
```
