const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('../db/mongoose')

const doctorSchema = new mongoose.Schema({
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
    specialization: {
        type: String,
    },
     tokens: [{
         token: {
             type: String
         }
     }]

})

doctorSchema.methods.generateAuthToken = async function () {
    const doctor = this
    const token = jwt.sign({ _id: doctor._id.toString() }, process.env.SECRET)

    doctor.tokens = doctor.tokens.concat({ token })
    await doctor.save()

    return token
}

doctorSchema.statics.findByCredentials = async (email, password) => {
    const doctor = await Doctor.findOne({ email })

    if (!doctor) {
        throw new Error('Unable to log')
    }
    const isMatch = await bcrypt.compare(password, doctor.password)
    
    if (!isMatch) {
        throw new Error('Unable to logine')
    }
    return doctor
}

doctorSchema.pre('save', async function(next) {
    const doctor = this
    if (doctor.isModified('password')) {
        doctor.password = await bcrypt.hash(doctor.password, 8)
    }
    next()
})

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor