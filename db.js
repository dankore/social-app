const dotenv = require('dotenv')
dotenv.config()
const mongodb = require('mongodb')


mongodb.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true }, (err, client) => {
    // Return db object
    module.exports = client.db()
    const app = require('./app')
    app.listen(process.env.PORT)

})