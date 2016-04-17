import nock from 'nock'
import path from 'path'
import test from 'tape'

import { get, post, put, patch, del, multipart } from './index'

test('get()', (nest) => {
  nest.test('with valid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .get('/resource')
      .reply(200, 'okay')

    get('http://test.url/resource')
      .then(() => t.pass('request successful'))
      .catch((err) => t.fail(err))
  })

  nest.test('with an invalid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .get('/resource')
      .replyWithError('not okay')

    get('http://test.url/resource')
      .then((err) => t.fail(err))
      .catch(() => t.pass('request successful'))
  })

  nest.test('with timeout', (t) => {
    t.plan(1)

    nock('http://test.url')
      .get('/resource')
      .delay(20)
      .reply(200, 'okay')

    get('http://test.url/resource', { timeout: 10 })
      .then(() => t.fail('timeout did not fail request'))
      .catch((err) => {
        if (err.timeout) t.pass('request aborted after timeout')
        else t.fail('timeout did not fail request')
      })
  })
})

test('post()', (nest) => {
  nest.test('with valid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .post('/resource', { test: 'test' })
      .reply(200, 'okay')

    post('http://test.url/resource', { test: 'test' })
      .then(() => t.pass('request successful'))
      .catch((err) => t.fail(err))
  })

  nest.test('with an invalid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .post('/resource', { test: 'test' })
      .replyWithError('not okay')

    post('http://test.url/resource', { test: 'test' })
      .then((err) => t.fail(err))
      .catch(() => t.pass('request successful'))
  })

  nest.test('with timeout', (t) => {
    t.plan(1)

    nock('http://test.url')
      .post('/resource', { test: 'test' })
      .delay(20)
      .reply(200, 'okay')

    post('http://test.url/resource', { test: 'test' }, { timeout: 10 })
      .then(() => t.fail('timeout did not fail request'))
      .catch((err) => {
        if (err.timeout) t.pass('request aborted after timeout')
        else t.fail('timeout did not fail request')
      })
  })
})

test('patch()', (nest) => {
  nest.test('with valid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .patch('/resource', { test: 'test' })
      .reply(200, 'okay')

    patch('http://test.url/resource', { test: 'test' })
      .then(() => t.pass('request successful'))
      .catch((err) => t.fail(err))
  })

  nest.test('with an invalid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .patch('/resource', { test: 'test' })
      .replyWithError('not okay')

    patch('http://test.url/resource', { test: 'test' })
      .then((err) => t.fail(err))
      .catch(() => t.pass('request successful'))
  })

  nest.test('with timeout', (t) => {
    t.plan(1)

    nock('http://test.url')
      .patch('/resource', { test: 'test' })
      .delay(20)
      .reply(200, 'okay')

    patch('http://test.url/resource', { test: 'test' }, { timeout: 10 })
      .then(() => t.fail('timeout did not fail request'))
      .catch((err) => {
        if (err.timeout) t.pass('request aborted after timeout')
        else t.fail('timeout did not fail request')
      })
  })
})

test('put()', (nest) => {
  nest.test('with valid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .put('/resource', { test: 'test' })
      .reply(200, 'okay')

    put('http://test.url/resource', { test: 'test' })
      .then(() => t.pass('request successful'))
      .catch((err) => t.fail(err))
  })

  nest.test('with an invalid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .put('/resource', { test: 'test' })
      .replyWithError('not okay')

    put('http://test.url/resource', { test: 'test' })
      .then((err) => t.fail(err))
      .catch(() => t.pass('request successful'))
  })

  nest.test('with timeout', (t) => {
    t.plan(1)

    nock('http://test.url')
      .put('/resource', { test: 'test' })
      .delay(20)
      .reply(200, 'okay')

    put('http://test.url/resource', { test: 'test' }, { timeout: 10 })
      .then(() => t.fail('timeout did not fail request'))
      .catch((err) => {
        if (err.timeout) t.pass('request aborted after timeout')
        else t.fail('timeout did not fail request')
      })
  })
})

test('del()', (nest) => {
  nest.test('with valid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .delete('/resource')
      .reply(200, 'okay')

    del('http://test.url/resource')
      .then(() => t.pass('request successful'))
      .catch((err) => t.fail(err))
  })

  nest.test('with an invalid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .delete('/resource')
      .replyWithError('not okay')

    del('http://test.url/resource')
      .then((err) => t.fail(err))
      .catch(() => t.pass('request successful'))
  })

  nest.test('with timeout', (t) => {
    t.plan(1)

    nock('http://test.url')
      .delete('/resource')
      .delay(20)
      .reply(200, 'okay')

    del('http://test.url/resource', { timeout: 10 })
      .then(() => t.fail('timeout did not fail request'))
      .catch((err) => {
        if (err.timeout) t.pass('request aborted after timeout')
        else t.fail('timeout did not fail request')
      })
  })
})

test('multipart()', (nest) => {
  nest.test('with valid response', (t) => {
    t.plan(1)

    const attachments = [
      ['test', `${path.resolve(process.cwd(), './fixtures/example.txt')}`],
    ]

    nock('http://test.url')
      .post('/resource')
      .reply(200, 'okay')

    multipart('http://test.url/resource', { attachments })
      .then(() => t.pass('request successful'))
      .catch((err) => t.fail(err))
  })

  nest.test('with an invalid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .post('/resource', { test: 'test' })
      .replyWithError('not okay')

    post('http://test.url/resource', { test: 'test' })
      .then((err) => t.fail(err))
      .catch(() => t.pass('request successful'))
  })

  nest.test('with timeout', (t) => {
    t.plan(1)

    const attachments = [
      ['test', `${path.resolve(process.cwd(), './fixtures/example.txt')}`],
    ]

    nock('http://test.url')
      .post('/resource')
      .delay(20)
      .reply(200, 'okay')

    multipart('http://test.url/resource', { attachments }, { timeout: 10 })
      .then(() => t.fail('timeout did not fail request'))
      .catch((err) => {
        if (err.timeout) t.pass('request aborted after timeout')
        else t.fail('timeout did not fail request')
      })
  })
})
