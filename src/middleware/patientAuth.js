const jwt = require('jsonwebtoken')
const Patient = require('../models/Patient')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET)
        const patient = await Patient.findOne({ _id: decoded._id })
        if (!patient) {
            throw new Error()
        }
        req.token = token
        req.patient = patient
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'Please authenticate.'})
    }
}

module.exports = auth