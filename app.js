const express = require('express')
const app = express()

const router = require('./router')

// Add user submit input to body of request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Make this app find files for the public eyes - e.g css
app.use(express.static('public'))
// Make this app find html files
app.set('views', 'views-html') // First arg must be views
app.set('view engine', 'ejs')

app.use('/', router)
module.exports = app;