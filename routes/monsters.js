const { Router } = require('express')
const pool = require('../db')

// create instance of routing function
const router = Router()

router.get('/', async (request, response, next) => {
  try {
    await pool.query('SELECT * FROM monsters ORDER BY id ASC', (err, res) => {
      // pass control of this error to our error handler (which will be the catch all error function in app.use)
      if (err) return next(err)
      // callback function to render response rows from sql query
      response.json(res.rows)
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    // index of id based on url
    // $1 is placeholder
    await pool.query(
      'SELECT * FROM monsters WHERE id = $1',
      // specify actual variable being inserted (in array format) into placeholder value
      [id],
      (err, res) => {
        if (err) return next(err)
        response.json(res.rows)
      }
    )
  } catch (error) {
    next(error)
  }
})

router.post('/', async (request, response, next) => {
  try {
    const { name, personality } = request.body
    // $1 and $2 are placeholders in relation to request body
    await pool.query(
      'INSERT INTO monsters(name, personality) VALUES($1, $2)',
      // specify actual variables being inserted (in array format) into placeholder values
      [name, personality],
      (err, res) => {
        if (err) return next(err)
        response.redirect('/monsters')
      }
    )
  } catch (error) {
    next(error)
  }
})

router.put('/:id', (request, response, next) => {
  const { id } = request.params
  // for partial updates
  const keys = ['name', 'personality']
  const fields = []

  keys.forEach(key => {
    if (request.body[key]) fields.push(key)
  })

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE monsters SET ${field}=($1) WHERE id=($2)`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err)
        if (index === fields.length - 1) response.redirect('/monsters')
      }
    )
  })
  // const { name, personality } = request.body

  // pool.query(
  //   'UPDATE monsters SET name=($1), personality=($2) WHERE id=($3)',
  //   [name, personality, id],
  //   (err, res) => {
  //     if (err) return next(err)
  //     response.redirect('/monsters')
  //   }
  // )
})

router.delete('/:id', (request, response, next) => {
  const { id } = request.params
  pool.query('DELETE FROM monsters WHERE id=($1)', [id], (err, res) => {
    if (err) return next(err)
    response.redirect('/monsters')
  })
})

// shareable export
module.exports = router
