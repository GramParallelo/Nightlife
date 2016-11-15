import express from 'express'
import authenticate from '../middlewares/authenticate'
import Yelp from 'yelp-api-v3'
import axios from 'axios'
import Rsvp from '../models/rsvp'

let router = express.Router()

router.get('/search/:location', (req, res) => {
    const { location } = req.params
    console.log(location)
    const yelp = new Yelp({
      app_id: process.env.APP_ID,
      app_secret: process.env.APP_SECRET
    })

    yelp.search({term: 'bars', location: location, limit: 10}).then(function(data) {

      Rsvp.find({ location }).then((location) => {

        res.send([JSON.parse(data),location])
      })
    }).catch(function(err) {
        console.error(err)
    });
})

// router.post('/going', authenticate, (req, res) => {
//     const {id} = req.body
//     // Going({
//     //   barId,
//     //   attendees: [user]
//     // })
//     // .save()
//     // .then(poll => res.status(201).json({ success: true }))
//     // .catch(err => res.status(500).json({error: err}))
// })

export default router
