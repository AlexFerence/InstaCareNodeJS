const express = require('express')

const patientRouter = require('./routers/patientRouter')

const app = express()

const port = process.env.PORT

app.use(express.json())

app.use(patientRouter)

app.listen(port, () => {
    console.log('listening on port ' + port)
})