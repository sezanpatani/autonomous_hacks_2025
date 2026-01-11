// Lazy-loaded MongoDB client to avoid build-time imports
import type { Db } from 'mongodb'

let _MongoClient: any = null
let _clientPromise: Promise<any> | null = null

async function loadMongoClient() {
  if (_MongoClient) return _MongoClient
  
  try {
    const mongodb = await import('mongodb')
    _MongoClient = mongodb.MongoClient
    return _MongoClient
  } catch (error) {
    console.error('Failed to load MongoDB module:', error)
    return null
  }
}

async function getClientPromise(): Promise<any | null> {
  if (_clientPromise) return _clientPromise

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const MongoClient = await loadMongoClient()
  
  if (!MongoClient) {
    _clientPromise = Promise.resolve(null)
    return _clientPromise
  }

  if (process.env.NODE_ENV === 'development') {
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<any>
    }

    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(uri, {})
      globalWithMongo._mongoClientPromise = client.connect()
        .catch((err: Error) => {
          console.warn('MongoDB connection failed:', err.message)
          return null
        })
    }
    _clientPromise = globalWithMongo._mongoClientPromise || Promise.resolve(null)
  } else {
    const client = new MongoClient(uri, {})
    _clientPromise = client.connect().catch((err: Error) => {
      console.warn('MongoDB connection failed:', err.message)
      return null
    })
  }

  return _clientPromise
}

export async function getDatabase(): Promise<Db | null> {
  try {
    const client = await getClientPromise()
    if (!client) return null
    return client.db(process.env.MONGODB_DB || 'test')
  } catch {
    return null
  }
}
