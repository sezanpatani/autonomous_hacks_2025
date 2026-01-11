import { MongoClient, Db } from 'mongodb'

// Use MCP connection or local MongoDB
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const options = {}

let clientPromise: Promise<MongoClient | null> | null = null

function getClientPromise(): Promise<MongoClient | null> {
  if (clientPromise) return clientPromise

  if (process.env.NODE_ENV === 'development') {
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient | null>
    }

    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
        .catch((err) => {
          console.warn('MongoDB connection failed:', err.message)
          return null
        })
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    const client = new MongoClient(uri, options)
    clientPromise = client.connect().catch((err) => {
      console.warn('MongoDB connection failed:', err.message)
      return null
    })
  }

  return clientPromise
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

export default getClientPromise
