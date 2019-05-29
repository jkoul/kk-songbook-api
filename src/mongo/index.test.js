const { MongoClient, ObjectId } = require('mongodb')
const { getSort, getQuery, getSingleCollection } = require('.')

const objId = '5c269126268ee581048037ee'

describe('getQuery', () => {
  test('without an ID', () => {
    const query = getQuery({ title: 'test' })
    expect(query).toBeNull
  })
  test('an ID', () => {
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

describe.skip('getConnection', () => {
  let connection
  let db

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    })
    db = await connection.db('kostumeKaraoke')
  })

  afterAll(async () => {
    await connection.close()
    await db.close()
  })

  test('single record query', async () => {
    // set up record
    const songs = db.collection('songs')
    const mockSong = {
      '_id': '5c269126268ee581048037ee',
      'title': '(You\'re My) Obsession',
      'artist': 'Animotion'
    }
    await songs.insertOne(mockSong)
    expect(getSingleCollection('songs', { _id: ObjectId(objId) })).resolves.toEqual(mockSong)
  })
})
