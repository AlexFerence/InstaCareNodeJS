const express = require('express')
const path = require('path')

const patientRouter = require('./routers/patientRouter')

const app = express()

const port = process.env.PORT
const staticPath = path.join(__dirname, '../Public')

app.use(express.json())
app.use(patientRouter)
app.use(express.static(staticPath))

app.listen(port, () => {
    console.log('listening on port ' + port)
    console.log(process.env.MONGODB_URL)
})