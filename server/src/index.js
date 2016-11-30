import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import bodyParser from 'body-parser'

import users from './routes/users'
import auth from './routes/auth'
import bars from './routes/bars'

import mongoose from 'mongoose'
import uriUtil from 'mongodb-uri'

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
let options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    }
}

/*
 * Mongoose uses a different connection string format than MongoDB's standard.
 * Use the mongodb-uri library to help you convert from the standard format to
 * Mongoose's format.
 */
let mongodbUri = process.env.DB_HOST
let mongooseUri = uriUtil.formatMongoose(mongodbUri)

mongoose.connect(mongooseUri, options)

let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

////////////////////////

let app = express()

app.use(bodyParser.json())

app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/bars', bars)

if (process.env.NODE_ENV === 'production') {
    app.set('port', process.env.PORT)
    app.use(express.static('src/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('src/build/index.html'));
    })
} else {
    app.set('port', 8080)
}

app.listen(app.get('port'), () => {
    console.log(`Running server on LocalHost:${app.get('port')}`)
})
