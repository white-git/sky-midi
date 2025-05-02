const { keypress } = require('keypress')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())

app.get('/press', (req, res) => {
  keypress.keyToggle(req.query.key)
  res.send('OK')
})

app.listen(PORT, () => {
  console.log(`Listening ${PORT}`)
})
