let _clientPromise: Promise<any> | null = null

async function getClientPromise(): Promise<any | null> {
  if (_clientPromise) {
    return _clientPromise
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.warn('MONGODB_URI not configured')
    return null
  }

  try {
    const { MongoClient } = await import('mongodb')
    
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
      _clientPromise = client.connect()
        .catch((err: Error) => {
          console.warn('MongoDB connection failed:', err.message)
          return null
        })
    }

    return _clientPromise
  } catch (error) {
    console.error('Failed to import MongoDB:', error)
    return null
  }
}

export async function getDatabase(dbName: string = 'esg_city_db') {
  try {
    const client = await getClientPromise()
    if (!client) return null
    return client.db(dbName)
  } catch (error) {
    console.error('Failed to get database:', error)
    return null
  }
}

export default getClientPromise
