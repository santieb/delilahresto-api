const express = require('express')
const router = express.Router()
const facebookAuth = require('../services/facebook')
const spotifyAuth = require('../services/spotify')

const passport = require('passport')

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

router.use('/', facebookAuth, spotifyAuth)

module.exports = router
