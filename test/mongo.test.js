const { ObjectId } = require('mongodb')
const { getSort, getQuery } = require('../src/mongo')

describe('getQuery', () => {
  test('without an ID', () => {
    const query = getQuery({ title: 'test' })
    expect(query).toEqual({ title: { '$regex': /test/g }})
  })
  test('an ID', () => {
    const objId = '5c269126268ee581048037ee'
    const query = getQuery({ id: objId })
    expect(query).toEqual({ _id: ObjectId(objId) })
  })
})

describe('getSort', () => {
  test('returns a sort block', () => {
    const sort = getSort([
      { field: 'artist', order: 1 },
      { field: 'title', order: 1 }
    ])
    expect(sort).toEqual({ artist: 1, title: 1 })
  })
})
