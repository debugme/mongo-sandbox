import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config()

const connect = async () => {
  try {
    const databaseUri = process.env.DATABASE_DEVELOPMENT
    const mongoClient = new MongoClient(databaseUri)
    await mongoClient.connect()
    console.log('connected')

    // connect to database. Will create it if it does not exist
    const database = mongoClient.db('shplat')

    // create a collection with a validating schema
    /*const options = {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["username", "password"],
          properties: {
            username: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            password: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            age: {
              bsonType: "int",
              minimum: 10,
              maximum: 100,
              description: "must be an integer between 10 and 100 and is optional"
            },
            gender: {
              enum: ["male", "female"],
              description: "must be male or female and is optional"
            }
          }
        }
      }
    }
    await database.createCollection('users', options)*/

    const collection = database.collection('users')

    // find all documents in collection
    console.log('-'.repeat(50))
    console.log(await collection.find().toArray())
    console.log('-'.repeat(50))
    
    // add document into collection
    await collection.insertOne({ username: 'bossman', password: 'valid-value' })
    console.log(await collection.find().toArray())
    console.log('-'.repeat(50))
    
    // update document in collection
    await collection.updateOne({ username: 'bossman' }, { $set: { password: 'invalid-value'}})
    console.log(await collection.find().toArray())
    console.log('-'.repeat(50))
    
    // delete document in collection
    await collection.deleteOne({ username: 'bossman' })
    console.log(await collection.find().toArray())
    console.log('-'.repeat(50))

  } catch (error) {
    console.log('disconnected', JSON.stringify(error.errInfo.details, null, 2))
  } finally {
    process.exit(0)
  }
}

connect()


