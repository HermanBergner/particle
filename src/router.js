import express from 'express'
import Particle from './particle'

const router = express.Router()

const particle = new Particle('14f8fd1b29ef5a819083ee53c4c3250df7d2b314')

router.get('/api', (req, res) => res.send({message:'API'}))

router.get('/api/devices', async (req, res) => {
  const devices = await particle.devices()
  res.send(devices)
})


router.get('/api/call/:device/:name/:arg?', async (req, res) => {

  const { device, name, arg } = req.params
  const return_value = await particle.call({ device, name, argument: arg ? arg : '' })

  res.send({return_value})
})

export default router