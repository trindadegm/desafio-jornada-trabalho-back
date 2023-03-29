import express from 'express'
import cors from 'cors'

const port = 8000
const app = express()

// Allow all origins to make requests to this API
app.use(cors())

app.use(express.json())

var gSchedule = {
  active: true,
  configType: 'abort',
  schedules: [
    {
      day: 1,
      beginTime: '09:10',
      endTime: '17:30',
    },
    {
      day: 3,
      beginTime: '09:10',
      endTime: '17:30',
    },
    {
      day: 5,
      beginTime: '09:10',
      endTime: '17:30',
    },
    {
      day: 6,
      beginTime: '14:00',
      endTime: '16:00',
    },
  ],
}

app.get('/schedule', (req, res) => {
  res.send(gSchedule)
})

app.put('/schedule', (req, res) => {
  console.debug(`Request: ${JSON.stringify(req.body)}`)
  gSchedule = req.body
  res.status(200).send()
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})