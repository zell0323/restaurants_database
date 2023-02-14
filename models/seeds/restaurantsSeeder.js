if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const User = require('../user')
const restaurantsList = require('./restaurant.json')
const Restaurant = require('../restaurant.js')
const db = require('../../config/mongoose')


const SEED_USER1 =
  { name: 'user1', email: 'user1@example.com', password: '12345678', ownership: ['1', '2', '3'] }
const SEED_USER2 =
  { name: 'user2', email: 'user2@example.com', password: '12345678', ownership: ['4', '5', '6'] }


db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => {
      return bcrypt.hash(SEED_USER1.password, salt)
    })
    .then(hash => {
      return User.create({
        name: SEED_USER1.name,
        email: SEED_USER1.email,
        password: hash
      })
    })
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(SEED_USER1.ownership, (id, _) => {
        return Promise.all(Array.from(restaurantsList.results, (restaurant, _) => {
          if (id === String(restaurant.id)) {
            restaurant.userId = userId
            return Restaurant.create(restaurant)
          }
        }))
      }))
    })
    .then(() => {
      bcrypt
        .genSalt(10)
        .then(salt => {
          return bcrypt.hash(SEED_USER2.password, salt)
        })
        .then(hash => {
          return User.create({
            name: SEED_USER2.name,
            email: SEED_USER2.email,
            password: hash
          })
        })
        .then(user => {
          const userId = user._id
          return Promise.all(Array.from(SEED_USER2.ownership, (id, _) => {
            return Promise.all(Array.from(restaurantsList.results, (restaurant, _) => {
              if (id === String(restaurant.id)) {
                restaurant.userId = userId
                return Restaurant.create(restaurant)
              }
            }))
          }))
        })
        .then(() => {
          console.log('done')
          process.exit()
        })
    })

})

