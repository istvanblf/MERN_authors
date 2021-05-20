const authorController = require("../controllers/author.controller");

// LEADING SLASHES ON URLS REQUIRED!

// Django urls.py: path("api/authors", views.allauthors)

// Export a function to be called in server.js
module.exports = (app) => {
  app.post("/api/authors", authorController.create);
  app.get("/api/authors", authorController.getAll);
  /* 
  This route has to come above the other get because :id will think the
  word "random" is the :id if the :id route is above it.
  */
  // app.get("/api/authors/random", authorController.random);
  app.get("/api/authors/:id", authorController.getOne);
  app.delete("/api/authors/:id", authorController.delete);
  app.put("/api/authors/:id", authorController.update);
  app.post("/api/authors/many", authorController.createMany);
};
