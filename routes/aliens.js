const { Router } = require('express')
const pool = require('../db')

// create instance of routing function
const router = Router()

router.get('/', (request, response, next) => {
  pool.query('SELECT * FROM aliens', (err, res) => {
    if (err) return next(err)
    response.json(res.rows)
  })
})

router.get('/:id', (request, response, next) => {
  const { id } = request.params
  pool.query('SELECT * FROM aliens WHERE id=$1', [id], (err, res) => {
    if (err) return next(err)
    response.json(res.rows)
  })
})

router.put('/:id', (request, response, next) => {
  const { id } = request.params

  const keys = ['name', 'size']
  const fields = []
  keys.forEach(key => {
    if (request.body[key]) fields.push(key)
  })

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE aliens SET ${field}=($1) WHERE id=($2)`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err)
        if (index === fields.length - 1) response.redirect('/aliens')
      }
    )
  })
})

router.delete('/:id', (request, response, err) => {
  const { id } = request.params
  pool.query('DELETE FROM aliens WHERE id=$1', [id], (err, next) => {
    if (err) return next(err)
    response.redirect('/aliens')
  })
})

module.exports = router
