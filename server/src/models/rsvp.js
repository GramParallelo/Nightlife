import mongoose from 'mongoose'

let Rsvp = mongoose.Schema({
  location: {type: String},
  bars: [{
    barId: {type: String},
    attendees: [String]
  }]
})

let rsvpModel = mongoose.model('rsvp', Rsvp)

export default rsvpModel
