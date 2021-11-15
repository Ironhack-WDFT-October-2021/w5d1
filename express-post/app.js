const express = require('express')
const app = express()

const port = 3000

// middleware - it's just a function
let accessCount = 0
function count() {
	// the middleware always returns a request handler
	return (req, res, next) => {
		accessCount++
		console.log(accessCount)
		// we are done and proceed as planned -> pass control to the next middleware
		// / request handler
		next()
	}
}

app.set('view engine', 'hbs');

// this line is needed to handle the body of a post request
app.use(express.urlencoded({ extended: false }));

// registering a middleware globally
app.use(count())

app.get('/', count(), (req, res) => {
	res.render('form')
})

app.post('/post-example', (req, res) => {
	// access the request body
	// console.log(req.body)
	res.send(req.body.username)
	// const username = req.body.username
	// res.render('dashboard', { username: username })
})

app.listen(3000)