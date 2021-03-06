//Server setup
const express = require("express")
var app = express()
const http = require("http")
const bodyParser = require("body-parser")
// In case of front-end data access control issues
//Important : Place the CORS configuration at top
var cors = require("cors")

var corsOptions = {
    origin: [
        process.env.CLIENT_HOST || 'http://localhost:80'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204
}
app.options('*', cors())
app.use(cors(corsOptions))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next();
});

const PORT = process.env.PORT || '81'
app.set('port', PORT)


const server = http.createServer(app)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require("./server/config/empdb.config");
app.use('/', require('./server/routes'));

server.listen(PORT, console.log(`Server started on port ${PORT}!!`))