const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// EJS (Order matters)
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')

app.use(express.static('public'))

// Body Parser Middleware
app.use(express.json())

// DB config
const db = process.env.DATABASE_URL

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err))

app.use('/', indexRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))