const mongoose = require('mongoose')
const Author = require('../models/authorModel')
const Car = require('../models/carModel')

const carCtrl = {
  addCar: async(req, res) => {    
    try {
      const car = await Car.create(req.body)
      res.status(201).json({message: "car created!", car})
    } catch (error) {
      console.log(error);
      res.status(503).json(error.message)
    }
  },

  getCars: async (req, res) => {
    try {
      const cars = await Car.find().populate('author', 'firstname')
      res.status(200).json({message: "All Cars", cars})
    } catch (error) {
      console.log(error);
      res.status(503).json(error.message)
    }
  }, 

  getCarById: async (req, res) => {
    const {id} = req.params

    try {
      const car = await Car.aggregate([
        {$match: {_id: new mongoose.Types.ObjectId(id)}},
        {$lookup: {from: 'comments', let: {carId: '$_id'},
        pipeline: [
          {$match: {$expr: {$eq: ["$carId", "$$carId"]}}},
          {$lookup: {from: 'authors', let: {authorId: "$authorId"},
          pipeline : [
            {$match: {$expr: {$eq: ["$_id", "$$authorId"]}}}
          ],
          as: "author",
        }}
        ],
        as: "comments"
      }},        
      ])
      res.send(car)
    } catch (error) {
      console.log(error);
      res.status(503).json(error.message)
    }
  }
}


module.exports = carCtrl