const express = require("express");
const cors = require("cors");
// const _ = require("lodash");
const multer = require("multer");
const formidable = require("express-formidable");

const backendVersion = "0.1.0-snapshot"; // TODO: Load it from package.json
const upload = multer({ dest: "uploads/" });
const path = require("path");
const authcontroller = require("./controllers/auth.controller");
const ingredientscontroller = require("./controllers/ingredients.controller");
const recipecontroller = require("./controllers/recipe.controller");
const authJwt = require("./middleware/authJwt");
const con = require("./config/sql.config");

const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("This is cookbook-backend.");
});

app.use(cors());

app.use(formidable());

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/version", (req, res) => {
  res.send(JSON.stringify(backendVersion));
});

app.get("/api/ingredients", ingredientscontroller.ingredients);
app.put(
  "/api/ingredient/:id",
  [authJwt.verifyToken],
  ingredientscontroller.updateIngredient
);

app.all(
  "/api/ingredients/save",
  [authJwt.verifyToken],
  ingredientscontroller.saveingredients
);

app.get(
  "/api/ingredients/recipes/:id?",
  ingredientscontroller.recipeingredients
);

app.delete(
  "/api/ingredients/:recipeId/:id",
  ingredientscontroller.deleterecipeingredient
);

app.delete("/api/ingredients/:id", ingredientscontroller.deleteingredient);

app.all("/api/auth/login", authcontroller.signin);

app.all("/api/auth/register", authcontroller.register);

app.all("/api/comment", [authJwt.verifyToken], recipecontroller.comment);

app.get(
  "/api/view_comments/:id?",
  [authJwt.verifyToken],
  recipecontroller.viewcomments
);

app.get("/api/recipes/:id?", recipecontroller.userrecipe);

app.get("/api/searchrecipe/:userSearch?", recipecontroller.searchrecipe);

app.get("/api/homepage_recipes", recipecontroller.allrecipes);

// app.post("/api/add-recipe",[authJwt.verifyToken], upload.single("image"), recipecontroller.addrecipe);
app.post("/api/add-recipe", [authJwt.verifyToken], recipecontroller.addrecipe);

app.post(
  "/api/edit-recipe/:id",
  [authJwt.verifyToken],
  upload.single("image"),
  recipecontroller.editrecipe
);

app.listen(PORT);
console.log(
  `Running on port ${PORT}. (If ran inside Docker, the port might be different.)`
);
