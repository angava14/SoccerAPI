const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString).then(() => {
  console.log('Connected to DB')
}).catch(error => {
  console.log(error)
})
