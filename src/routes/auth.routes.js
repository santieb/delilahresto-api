const express = require('express')
const router = express.Router()
const facebookAuth = require('../services/facebook')
const githubAuth = require('../services/github')
const googleAuth = require('../services/google')
const linkedinAuth = require('../services/linkedin')

const passport = require('passport')

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

router.use('/', facebookAuth, githubAuth, googleAuth, linkedinAuth)

module.exports = router
