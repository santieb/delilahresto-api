const express = require('express')
const router = express.Router()
const passport = require('passport')
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const jwt = require('jsonwebtoken')
const User = require('../models/users.models')

passport.use(new LinkedinStrategy ({
  clientID: process.env.LINKEDIN_APP_ID,
  clientSecret: process.env.LINKEDIN_APP_SECRET,
  callbackURL: 'https://www.delilahresto.gq/api/auth/linkedin/delilahresto',
  scope: ['r_emailaddress'],
  profileFields: ['email-address','public-profile-url'],
  passReqToCallback: true
},
(accessToken, refreshToken, expires_in, profile, done) => {
  User.findOrCreate({ email: profile.emails[0].value }, function (err, user) {
    return done(err, user)
  })
}
))

router.get('/auth/linkedin', passport.authenticate("linkedin", {
  scope: ["r_liteprofile", "r_emailaddress"],
  credentials: "include",})
)

router.get('/auth/linkedin/delilahresto',
  passport.authenticate('linkedin', {
    session: false
  }), (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })
    if (token) {    
      res.redirect('https://delilahreesto.herokuapp.com/?token=' + token)
    }
  }
)

module.exports = router