import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/user'
import isEmpty from 'lodash/isEmpty'

export default (req, res, next) => {
  const authorization = req.headers['authorization']
  let token

  if (authorization) {
    token = authorization.split(' ')[1]
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate'})
      } else {
        User.find({ _id: decoded.id })
        .then(user => {
          if (isEmpty(user)) {
            res.status(404).json({ error: 'No such user'})
          } else {
            req.currentUser = user
            next()
          }
        })
      }
    })
  } else {
    res.status(403).json({
      error: 'No token provided'
    })
  }
}
