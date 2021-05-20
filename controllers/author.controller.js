const Author = require("../models/author.model");

// Export an object that is full of methods.
module.exports = {
  // long-form - key: value format
  create: function (req, res) {
    console.log("create method executed.");

    Author.create(req.body)
      .then((author) => {
        // Newly created author from DB that includes DB id.
        res.json(author);
      })
      .catch((err) => {
        // This makes axios on the front-end react side trigger the .catch.
        res.status(400).json(err);
      });
  },

  getAll(req, res) {
    console.log("getAll method executed.");

    Author.find()
      .then((authors) => {
        res.json(authors);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  getOne(req, res) {
    console.log("getOne method executed", "url params:", req.params);

    Author.findById(req.params.id)
      .then((author) => {
        res.json(author);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  delete(req, res) {
    console.log("delete method executed", "url params:", req.params);

    Author.findByIdAndDelete(req.params.id)
      .then((author) => {
        res.json(author);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  update(req, res) {
    console.log("update method executed", "url params:", req.params);

    Author.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true, // to return update doc instead of old one.
    })
      .then((author) => {
        res.json(author);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // NOT ON EXAM, this was used to receive a JSON array of many authors.
  createMany(req, res) {
    const promises = req.body.map((dest) => {
      return author.create(dest);
    });

    Promise.allSettled(promises).then((results) => {
      res.json(results);
    });
  },
};
