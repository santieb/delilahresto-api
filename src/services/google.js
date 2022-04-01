const express = require('express')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken')
const user = require('../models/users.models')

passport.use(new GoogleStrategy ({
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/delilahresto'
},
(accessToken, refreshToken, expires_in, profile, done) => {

  user.findOrCreate({ email: profile._json.email }, function (err, user) {
    return done(err, user)
  })
}
))

router.get('/auth/google', passport.authenticate('google', { scope: ["email", "profile"] }))

router.get('/auth/google/delilahresto',
  passport.authenticate('google', {
    session: false
  }), (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })
    if (token) {
      res.redirect('http://localhost:3001/?token=' + token)
    }
  }
)

module.exports = router