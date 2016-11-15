import express from 'express'
import isEmpty from 'lodash/isEmpty'

import commonValidations from '../shared/validations/signup'
import bcrypt from 'bcrypt'

import User from '../models/user'

let router = express.Router();

function validateInput(data, otherValidations) {

    let {errors} = otherValidations(data);

    return User.find({
        $or: [
            {
                username: data.username
            }, {
                email: data.email
            }
        ]
    }).then(user => {
        if (user.length) {
            if (user[0].username === data.username) {
                errors.username = 'Sorry, username has been taken';
            }
            if (user[0].email === data.email) {
                errors.email = 'Email is already registered';
            }
        }
        return {
          errors: errors,
          isValid: isEmpty(errors)
        }
    })
}
// used in actions signupactionas/isUserExists
router.get('/:identifier', (req, res) => {
  User.find({
    $or: [
      {
        username: req.params.identifier
      }, {
        email: req.params.identifier
      }
    ]
  }).then(user => {
    res.json({ user })
  })
})

router.post('/', (req, res) => {
    validateInput(req.body, commonValidations).then(({errors, isValid}) => {
    if (isValid) {
        const {username, password, timezone, email} = req.body
        const password_hash = bcrypt.hashSync(password, 10)

        let newUser = new User({
          username,
          password: password_hash,
          email,
          timezone
          })

        newUser.save()
        .then(newUser => res.json({success: true}))
        .catch(err => res.status(500).json({error: err}))
    } else {
      res.status(400).json(errors)
    }
  })
})

export default router
