const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id   
  Restaurant.find({ userId })        
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id
  const noResult = '<h1 class="text-center">查無餐廳</h1>'
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => {
      restaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
           
      if (restaurants.length !== 0) {
        res.render('index', { restaurants })
      }
      else {
        res.render('index', { noResult })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router