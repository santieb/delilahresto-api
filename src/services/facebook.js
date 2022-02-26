const express = require('express')
const router = express.Router()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/users.models')

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/delilahresto'
},
(accessToken, refreshToken, profile, cb) => {
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user)
  })
}
))

router.get('/auth/facebook', passport.authenticate('facebook'))

router.get('/auth/facebook/delilahresto',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://127.0.0.1:5500/client/home.html')
  }
)

module.exports = router
