import nock from 'nock'
import path from 'path'
import test from 'tape'

import highwireFactory from '../src/index'

const { get, post, put, patch, del, multipart } = highwireFactory()

test('get()', (nest) => {
  nest.test('with valid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .get('/resource')
      .reply(200, 'okay')

    get('http://test.url/resource')
      .then(t.pass)
      .catch(t.fail)
  })

  nest.test('with an invalid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .get('/resource')
      .replyWithError('not okay')

    get('http://test.url/resource')
      .then(t.fail)
      .catch(t.pass)
  })
})

test('post()', (nest) => {
  nest.test('with valid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .post('/resource', { test: 'test' })
      .reply(200, 'okay')

    post('http://test.url/resource', { test: 'test' })
      .then(t.pass)
      .catch(t.fail)
  })

  nest.test('with an invalid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .post('/resource', { test: 'test' })
      .replyWithError('not okay')

    post('http://test.url/resource', { test: 'test' })
      .then(t.fail)
      .catch(t.pass)
  })
})

test('patch()', (nest) => {
  nest.test('with valid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .patch('/resource', { test: 'test' })
      .reply(200, 'okay')

    patch('http://test.url/resource', { test: 'test' })
      .then(t.pass)
      .catch(t.fail)
  })

  nest.test('with an invalid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .patch('/resource', { test: 'test' })
      .replyWithError('not okay')

    patch('http://test.url/resource', { test: 'test' })
      .then(t.fail)
      .catch(t.pass)
  })
})

test('put()', (nest) => {
  nest.test('with valid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .put('/resource', { test: 'test' })
      .reply(200, 'okay')

    put('http://test.url/resource', { test: 'test' })
      .then(t.pass)
      .catch(t.fail)
  })

  nest.test('with an invalid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .put('/resource', { test: 'test' })
      .replyWithError('not okay')

    put('http://test.url/resource', { test: 'test' })
      .then(t.fail)
      .catch(t.pass)
  })
})

test('del()', (nest) => {
  nest.test('with valid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .delete('/resource')
      .reply(200, 'okay')

    del('http://test.url/resource')
      .then(t.pass)
      .catch(t.fail)
  })

  nest.test('with an invalid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .delete('/resource')
      .replyWithError('not okay')

    del('http://test.url/resource')
      .then(t.fail)
      .catch(t.pass)
  })
})

test('multipart()', (nest) => {
  nest.test('with valid response', (t) => {
    t.plan(1)

    const attachments = [
      ['test', `${path.resolve(__dirname, './fixtures/example.txt')}`],
    ]

    nock('http://test.url')
      .post('/resource')
      .reply(200, 'okay')

    multipart('http://test.url/resource', { attachments })
      .then(t.pass)
      .catch(t.fail)
  })

  nest.test('with an invalid response', (t) => {
    t.plan(1)

    nock('http://test.url')
      .post('/resource', { test: 'test' })
      .replyWithError('not okay')

    post('http://test.url/resource', { test: 'test' })
      .then(t.fail)
      .catch(t.pass)
  })
})
