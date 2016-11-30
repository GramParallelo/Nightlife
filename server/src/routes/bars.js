import express from 'express'
import authenticate from '../middlewares/authenticate'
import Yelp from 'yelp-api-v3'
import axios from 'axios'
import Rsvp from '../models/rsvp'

let router = express.Router()

router.get('/search/:location', (req, res) => {
    const {location} = req.params
    const yelp = new Yelp({app_id: process.env.APP_ID, app_secret: process.env.APP_SECRET})

    yelp.search({term: 'bars', location: location, limit: 10}).then(function(yelpData) {
        yelpData = JSON.parse(yelpData).businesses
        let data = yelpData.map((bar) => {
            return Rsvp.find({barId: bar.id}).then((entry) => {

                if (entry.length === 0) {
                    let newBar = new Rsvp({
                        location: location,
                        barId: bar.id,
                        url: bar.url,
                        img_url: bar.image_url,
                        name: bar.name,
                        attendees: [],
                        createdAt: new Date()
                    })
                    newBar.save()
                    return newBar
                } else {
                    return entry[0]
                }
            })
        })
        Promise.all(data).then(values => res.send([values, values]))

    }).catch(function(err) {
        console.error(err)
    });
})

router.post('/going', (req, res) => { 
    const {location, barId, user, attending} = req.body

    // array.indexOf(value) returns -1 if value does not exist in array
    if (attending === -1) {
        // GOING
        Rsvp.findOneAndUpdate({
            location: location.toLowerCase(),
            barId: barId
        }, {
            $addToSet: {
                attendees: user
            }
        }, {new: true}).then(entry => res.status(201).send(entry)).catch(err => res.status(500).json({error: err}))
    } else {
        // NOTGOING
        Rsvp.findOneAndUpdate({
            location: location.toLowerCase(),
            barId: barId
        }, {
            $pull: {
                attendees: user
            }
        }, {new: true}).then(entry => res.status(201).send(entry)).catch(err => res.status(500).json({error: err}))
    }
})

export default router
