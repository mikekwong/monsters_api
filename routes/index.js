const { Router } = require('express')
const monsters = require('./monsters')
const habitats = require('./habitats')
const lives = require('./lives')
const aliens = require('./aliens')

const router = Router()

router.use('/monsters', monsters)
router.use('/habitats', habitats)
router.use('/lives', lives)
router.use('/aliens', aliens)

module.exports = router
