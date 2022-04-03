const express = require('express')
const router = express.Router()
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const jwt = require('jsonwebtoken')
const user = require('../models/users.models')

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_APP_ID,
  clientSecret: process.env.GITHUB_APP_SECRET,
  scope: ['user:email'],
  callbackURL: 'https://www.delilahresto.gq/api/auth/github/delilahresto',
},
(accessToken, refreshToken, profile, cb) => {
  user.findOrCreate({ email: profile.emails[0].value }, function (err, user) {
    return cb(err, user)
  })
}
))

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }))

router.get('/auth/github/delilahresto',
  passport.authenticate('github', {
    session: false
  }), (req, res) => {
    console.log(req.user.id)
    const token = jwt.sign({ id: req.user.id }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })
    if (token) {
      res.redirect('https://delilahreesto.herokuapp.com/?token=' + token)
    }
  }
)

module.exports = router