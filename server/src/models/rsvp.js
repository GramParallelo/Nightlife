import mongoose from 'mongoose'

let Rsvp = mongoose.Schema({
  location: {type: String},
  name: {type: String},
  barId: {type: String},
  img_url: {type: String},
  url: {type: String},
  attendees: [String],
  createdAt: Date
})

let rsvpModel = mongoose.model('rsvp', Rsvp)

export default rsvpModel
