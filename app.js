if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
const methodOverride = require('method-override')
const flash = require('connect-flash')  

require('./config/mongoose')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})
app.use(express.static('public'))
app.use(routes)


// setting template engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.listen(port, () => {
  console.log('start listening')
})