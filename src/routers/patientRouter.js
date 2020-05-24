const mongoose = require('mongoose')
const express = require('express')
const Patient = require('../models/Patient')
const auth = require('../middleware/patientAuth')

const router = new express.Router()

router.get('/patient/all', async (req, res) => {
    try {
        const patients = await Patient.find({})
        res.send(patients) 
    } catch (e) {
        res.status(500).send(e)
    }
    
})

router.get('', (req, res) => {
    res.send({ message: 'hello' })
})

router.post('/new', async (req, res) => {
    try {
        const p = new Patient({ usernam: "a", email: "b@gmail.com", password:"1234567" })
        await p.save()
        res.send(p)
    } catch(e) {
        res.send(e)
    }
})

router.post('/patient', async (req, res) => {
    try {
        console.log('1')
        const patient = new Patient(req.body);
        console.log('2')
        await patient.save()
        console.log('3')
        const token = await patient.generateAuthToken()
        res.status(201).send({ patient, token })
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.post('/patient/login', async (req, res) => {
    try {
        const patient = await Patient.findByCredentials(req.body.email, req.body.password)
        const token = await patient.generateAuthToken()
        res.status(200).send({ patient, token })
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
        const allowed = ['name', 'email', 'password', 'age']
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