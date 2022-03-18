const express = require('express')
const router = express.Router()
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const jwt = require('jsonwebtoken')
const user = require('../models/users.models')

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_APP_ID,
  clientSecret: process.env.GITHUB_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/delilahresto'
},
(accessToken, refreshToken, profile, cb) => {
  console.log(profile)
  user.findOrCreate({ githubId: profile.id, name: profile.displayName }, function (err, user) {
    return cb(err, user)
  })
}
))

router.get('/auth/github', passport.authenticate('github'))

router.get('/auth/github/delilahresto',
  passport.authenticate('github', {
    session: false
  }), (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })
    if (token) {
      res.redirect('http://localhost:3001/?token=' + token)
    }
  }
)

module.exports = router