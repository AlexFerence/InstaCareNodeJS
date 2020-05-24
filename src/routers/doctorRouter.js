const mongoose = require('mongoose')
const express = require('express')
const Doctor = require('../models/Doctor')
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

router.post('/patient/logout', auth, async (req, res) => {
    try {
        req.patient.tokens = req.patient.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.patient.save()
        res.send({ patient: req.patient, tokens: req.patient.tokens })
    } catch (e) {
        res.status(500).send

    }
})

router.get('/patient/me', auth, async (req, res) => {
    res.send(req.patient)
})

router.patch('/patient/me', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowed = ['name', 'email', 'password', 'age', 'symptoms']
        const isValid = updates.every((update) => {
            return allowed.includes(update)
        })

        if (!isValid) {
            return res.status(404).send({ error: 'Invalid updates' })
        }
        const patient = req.patient

        updates.forEach((update) => {
            patient[update] = req.body[update]
        })
        await patient.save()

        if (!patient) {
            return res.status(404).send(e)
        }

        res.send(patient)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router