const mongodb = require('mongodb')

const connectionString = "mongodb+srv://todoAppUser:zimma123@cluster0-gsirt.mongodb.net/social-app?retryWrites=true&w=majority"

mongodb.connect(connectionString, { useNewUrlParser: true }, (err, client) => {
    // Return db object
    module.exports = client.db()
    const app = require('./app')
    app.listen(3000)

})