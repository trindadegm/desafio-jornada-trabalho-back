import express from 'express'
import cors from 'cors'
import { body, validationResult } from 'express-validator'

const port = 8000
const app = express()

// Allow all origins to make requests to this API
app.use(cors())

app.use(express.json())

var gSchedule = {
  active: false,
  configType: 'sendInNextJourney',
  schedules: [],
}

app.get('/schedule', (req, res) => {
  res.send(gSchedule)
})

app.put(
  '/schedule',
  body('active').isBoolean(),
  body('configType').isIn(['abort', 'sendInNextJourney']),
  body('schedules.*.day').isIn([0, 1, 2, 3, 4, 5, 6]),
  body('schedules.*.beginTime').matches("(2[0-3]|[0-1][0-9]):[0-5][0-9]"),
  body('schedules.*.endTime').matches("(2[0-3]|[0-1][0-9]):[0-5][0-9]"),
  (req, res) => {
    console.debug(`Request: ${JSON.stringify(req.body)}`)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    } else {
      gSchedule = req.body
      res.status(200).send()
    }
  }
)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})