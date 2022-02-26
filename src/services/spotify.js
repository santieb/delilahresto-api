const express = require('express')
const router = express.Router()
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const User = require('../models/users.models')

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_APP_ID,
  clientSecret: process.env.SPOTIFY_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/delilahresto'
},
(accessToken, refreshToken, expires_in, profile, done) => {
  User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
    return done(err, user)
  })
}
))

router.get('/auth/spotify', passport.authenticate('spotify'))

router.get('/auth/spotify/event-online',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://127.0.0.1:5500/home.html')
  }
)

module.exports = router
