const { User, validate } = require('../models/user')
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

//Getting current user
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})

//Create a new user
router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered')

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'phoneNumber']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    try {
        await user.save()
        const token = user.generateAuthToken()
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'phoneNumber']))

    } catch (error) {
        res.status(500).send('An error occurred while processing your request.')
    }


})

module.exports = router