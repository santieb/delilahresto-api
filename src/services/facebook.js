const express = require('express')
const router = express.Router()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const user = require('../models/users.models')

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/delilahresto'
},
(accessToken, refreshToken, profile, cb) => {
  user.findOrCreate({ facebookId: profile.id, name: profile.displayName }, function (err, user) {
    return cb(err, user)
  })
}
))

router.get('/auth/facebook', passport.authenticate('facebook'))


router.get('/auth/facebook/delilahresto',
  passport.authenticate('facebook', {
    session: false
  }), (req, res) => {

    const token = jwt.sign({ id: req.user.id }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })

    if (token) {
      res.json({
        success: true,
        token: token
      })
    } else {
      res.json({
        success: false
      })
    }
  }
)

module.exports = router
