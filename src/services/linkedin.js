const express = require('express')
const router = express.Router()
const passport = require('passport')
const LinkedinStrategy = require('passport-linkedin').Strategy;
const jwt = require('jsonwebtoken')
const User = require('../models/users.models')

passport.use(new LinkedinStrategy ({
  clientID: process.env.LINKEDIN_APP_ID,
  clientSecret: process.env.LINKEDIN_APP_ID,
  callbackURL: 'http://localhost:3000/auth/linkedin/delilahresto'
},
(accessToken, refreshToken, expires_in, profile, done) => {
  console.log(profile.id);
  User.findOrCreate({ linkedinId: profile.id, name: profile.displayName }, function (err, user) {
    return done(err, user)
  })
}
))

router.get('/auth/linkedin', passport.authenticate('linkedin'))

router.get('/auth/linkedin/delilahresto',
  passport.authenticate('linkedin', {
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