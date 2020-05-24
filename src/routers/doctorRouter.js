const mongoose = require('mongoose')
const express = require('express')
const Doctor = require('../models/Doctor')
const Patient = require('../models/Patient')
const auth = require('../middleware/patientAuth')

const router = new express.Router()


router.post('/doctor', async (req, res) => {
    try {
        console.log('1')
        const doctor = new Doctor(req.body);
        await doctor.save()
        const token = await doctor.generateAuthToken()
        res.status(201).send({ doctor, token })
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.post('/doctor/login', async (req, res) => {
    try {
        const doctor = await Doctor.findByCredentials(req.body.email, req.body.password)
        const token = await doctor.generateAuthToken()
        res.status(200).send({ doctor, token })
    } catch (e) {
        console.log(e)
        res.status(400).send('Cannot login')
    }
})

router.post('/doctor/logout', auth, async (req, res) => {
    try {
        req.doctor.tokens = req.doctor.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.doctor.save()
        res.send({ doctor: req.doctor, tokens: req.doctor.tokens })
    } catch (e) {
        res.status(500).send

    }
})

router.get('/doctor/me', auth, async (req, res) => {
    res.send(req.doctor)
})

router.get('/doctor/allPatients', async (req, res) => {
    try {
        const patients = await Patient.find({})
        patients = patients.forEach((patient) => {
        patient.password = ''
    })
    res.send(patient)
    } catch (e) {
        res.status(400).send(e)
    }
    
})

router.patch('/doctor/me', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowed = ['name', 'email', 'password', 'age', 'symptoms']
        const isValid = updates.every((update) => {
            return allowed.includes(update)
        })

        if (!isValid) {
            return res.status(404).send({ error: 'Invalid updates' })
        }
        const doctor = req.doctor

        updates.forEach((update) => {
            doctor[update] = req.body[update]
        })
        await doctor.save()

        if (!doctor) {
            return res.status(404).send(e)
        }

        res.send(doctor)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router