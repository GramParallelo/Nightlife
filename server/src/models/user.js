import mongoose from 'mongoose'

let User = mongoose.Schema({
  username: {type: String},
  email: {type: String},
  password: {type: String},
  signupDate: { type: Date, default: Date.now }
})

let userModel = mongoose.model('user', User)

export default userModel
