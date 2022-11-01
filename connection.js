const mongoose = require('mongoose')
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'testing'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

mongoose.connect(connectionString).then(() => {
  console.log('Connected to MongoDB')
}).catch(error => {
  console.log(error)
})
