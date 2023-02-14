const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


router.get('/new', (req, res) => {
  const objects = Restaurant.schema.obj
  delete objects.userId
  res.render('new', { objects })
})

router.post('/', (req, res) => {
  const attributes = req.body
  const userId = req.user._id
  attributes.userId = userId
  return Restaurant.create(attributes)     
    .then(() => res.redirect('/')) 
    .catch(error => console.log(error))
})


router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})


router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findOne({ id, userId })
    .lean()
    .then(restaurant => {
      const detail = Restaurant.schema.obj //取得model下的key，不包含_id、_v
      for (const key in detail) {
        for (const key2 in restaurant) {
          if (key === key2) {
            detail[key] = restaurant[key2] 
          }
        }
      }
      delete detail.userId
      res.render('edit', { id, detail })  //只render detail內的key
    })
    .catch(error => console.log(error))
})


router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })   
    .then(restaurant => {
      for (const prop in restaurant) {
        for (const prop2 in req.body) {
          if (prop === prop2) {
            restaurant[prop] = req.body[prop2]
          }
        }
      }
      restaurant.userId = userId
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router