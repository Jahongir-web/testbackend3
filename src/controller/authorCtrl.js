const Author = require('../models/authorModel')

const authorCtrl = {
  addAuthor: async(req, res) => {
    const {email} = req.body

    try {
      const author = await Author.findOne({email: email});
      if(author) {
        return res.status(400).json({message: "This is email exists"})
      }

      const newAuthor = await Author.create(req.body)

      res.status(201).json({message: "author created!", newAuthor})
    } catch (error) {
      console.log(error);
      res.status(503).json(error.message)
    }
  },

  getAuthors: async (req, res) => {
    try {
      const authors = await Author.find()
      
      // const authors = await Author.find().select('firstname email')

      res.status(200).json({message: "All Authors", authors})
    } catch (error) {
      console.log(error);
      res.status(503).json(error.message)
    }
  }
}


module.exports = authorCtrl