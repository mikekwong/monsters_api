const { Router } = require('express')
const pool = require('../db')

// create instance of routing function
const router = Router()

router.get('/', async (request, response, next) => {
  await pool.query('SELECT * FROM habitats ORDER BY id ASC', (err, res) => {
    if (err) return next(err)
    response.json(res.rows)
  })
})

router.get('/:id', async (request, response, next) => {
  const { id } = request.params
  await pool.query('SELECT * FROM habitats WHERE id=($1)', [id], (err, res) => {
    if (err) return next(err)
    response.json(res.rows)
  })
})

router.post('/', async (request, response, next) => {
  const { name, climate, temperature } = request.body
  await pool.query(
    'INSERT INTO habitats(name, climate, temperature) VALUES ($1, $2, $3)',
    [name, climate, temperature],
    (err, res) => {
      if (err) return next(err)
      response.redirect('/habitats')
    }
  )
})

module.exports = router
