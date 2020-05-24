const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('../db/mongoose')

const patientSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        default: 'Prefer not to say'
    },
    symptoms: {
        type: String,
    },
     tokens: [{
         token: {
             type: String
         }
     }]

})

patientSchema.methods.generateAuthToken = async function () {
    const patient = this
    const token = jwt.sign({ _id: patient._id.toString() }, process.env.SECRET)

    patient.tokens = patient.tokens.concat({ token })
    await patient.save()

    return token
}

patientSchema.statics.findByCredentials = async (email, password) => {
    const patient = await Patient.findOne({ email })

    if (!patient) {
        throw new Error('Unable to log')
    }
    const isMatch = await bcrypt.compare(password, patient.password)
    
    if (!isMatch) {
        throw new Error('Unable to logine')
    }
    return patient
}

patientSchema.pre('save', async function(next) {
    const patient = this
    if (patient.isModified('password')) {
        patient.password = await bcrypt.hash(patient.password, 8)
    }
    next()
    next()
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient