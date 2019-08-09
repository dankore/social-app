const express = require('express')
const app = express()

const router = require('./router')
console.log(router.name)

// Make this app find files for the public eyes - e.g css
app.use(express.static('public'))
// Make this app find html files
app.set('views', 'views-html') // First arg must be views
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home-guest')
})

app.listen(3000)