const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')


router.get('/register', (req, res) => {
  res.render('register')
})


router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10) 
      .then(salt => bcrypt.hash(password, salt)) 
      .then(hash => User.create({
        name,
        email,
        password: hash 
      }))
      .then(() => {
        req.flash('success_msg', '註冊成功！')
        res.redirect('/users/login')
      })
      .catch(err => console.log(err))
  })
})

router.get('/login', (req, res) => {
  res.render('login')
})


router.post("/login", (req, res) => {
  passport.authenticate("local",
    (err, user) => {
      if (user) { 
        req.login(user, (error) => {
          if (error) {
            res.send(error);
          } else {
            console.log("Successfully authenticated")
            res.redirect('/');        
          };
        });
      } else {
        req.flash('warning_msg', '帳號密碼錯誤！')
        res.redirect('/users/login') 
      };
    })(req, res)
})

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


module.exports = router