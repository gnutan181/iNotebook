// 690vZyKVIHHpmhgQ
const express = require('express')
var cors = require('cors')
const dbConnect = require('./db')
dbConnect()

const app = express()
const port = 3600

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`)
})