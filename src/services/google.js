const express = require('express')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken')
const User = require('../models/users.models')

passport.use(new GoogleStrategy ({
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/delilahresto'
},
(accessToken, refreshToken, expires_in, profile, done) => {
  console.log(profile.id);

  User.findOrCreate({ googleId: profile.id, name: profile.displayName }, function (err, user) {
    return done(err, user)
  })
}
))

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/auth/google/delilahresto',
  passport.authenticate('google', {
    session: false
  }), (req, res) => {
    console.log(req.user)
    const token = jwt.sign({ id: req.user.id }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })
    if (token) {
      res.redirect('http://localhost:3001/?token=' + token)
    }
  }
)

module.exports = router