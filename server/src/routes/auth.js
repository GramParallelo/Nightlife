import express from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
import jwtDecode from 'jwt-decode'

let router = express.Router()

router.post('/', (req, res) => {
  const { identifier, googleToken, password } = req.body

  if(googleToken) {
    const decoded = jwtDecode(googleToken)
    console.log(decoded);
    const token = jwt.sign({id: decoded.aud, username: decoded.name}, config.jwtSecret)
    res.json({ token })
  } else {
    User.find({
      $or: [
        {
          username: identifier
        },
        {
          email: identifier
        }
      ]
    }).then(user => {
      if (user) {

        if (bcrypt.compareSync(password, user[0]['password'])) {
          const token = jwt.sign({
            id: user[0]['id'],
            username: user[0]['username']
          }, config.jwtSecret)
          res.json({ token })
        } else {
          res.status(401).json({ errors: { form: 'Invalid Credentials' } })
        }
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } })
      }
    })
  }




})

export default router
