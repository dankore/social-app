const express = require('express')
const app = express()

// Make this app find html files
app.set('views', 'views-html') // First arg must be views
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home-guest')
})

app.listen(3000)