const _ = require("lodash");
const fs = require("fs");
const util = require("../src/utils");
const con = require("../config/sql.config");

exports.editrecipe = function (req, res) {
  // const { id } = req.params;

  res.end();
};

exports.addrecipe = (req, res) => {
  const data = req.fields;

  const { name } = data;
  const ownerId = data.owner_id;
  const { instruction } = data;
  const ingredientIds = data.ingredients.split(",");
  let base64Image = null;
  if (req.files.image) {
    const imageFile = fs.openSync(req.files.image.path);
    base64Image = util.base64_encode(imageFile);
    base64Image = Buffer.from(base64Image, "base64");
  }
  const recipeData = [
    [
      name,
      ownerId,
      instruction,
      base64Image,
      util.getCurrentDate(),
      util.getCurrentDate(),
    ],
  ];
  const sql =
    "INSERT INTO recipes (name, owner_id, instruction, image, date_added, date_modified) VALUES ?";

  con.query(sql, [recipeData], (err, result) => {
    if (err) {
      res.json({
        message: err,
      });
    }
    const recipeId = result.insertId;

    const ingredientData = ingredientIds.map((id) => [recipeId, id]);

    const sqlInner =
      "INSERT INTO recipes_ingredients (recipe_id, ingredient_id) VALUES ?";

    con.query(sqlInner, [ingredientData], (error) => {
      if (error) {
        res.json({
          message: new Error(error.message),
        });
      }
      res.json({
        recipe_id: recipeId,
        successCode: 1,
        message: "Recipe Inserted Successfully.",
      });
    });
  });
  // });
};

exports.allrecipes = (req, res) => {
  // const { id } = req.params;
  const sql = `
    SELECT r.*,i.id as ingredient_id,i.name as ingredient_name,(SELECT COUNT(*) FROM recipe_comments WHERE recipe_comments.recipe_id=r.id) as number_of_comments FROM recipes r 
    LEFT JOIN recipes_ingredients ri ON r.id =ri.recipe_id
    LEFT JOIN ingredients i ON ri.ingredient_id = i.id
    ORDER BY r.date_added DESC
    `;

  console.log(sql);
  con.query(sql, (err, response) => {
    if (err) throw err;
    console.log(response);
    const result = _.chain(response)
      .groupBy("name")
      .map((item) => {
        const recipe = item[0];
        return {
          id: recipe.id,
          name: recipe.name,
          owner_id: recipe.owner_id,
          instruction: recipe.instruction,
          image: recipe.image ? recipe.image.toString("base64") : null,
          date_added: recipe.date_added,
          date_modified: recipe.date_modified,
          number_of_comments: recipe.number_of_comments,
          ingredients: _.map(item, (data) => ({
            id: data.ingredient_id,
            name: data.ingredient_name,
          })),
        };
      });
    res.json(result);
  });
};

exports.searchrecipe = (req, res) => {
  const { userSearch } = req.params;
  let sql = `
    SELECT r.*,i.id as ingredient_id,i.name as ingredient_name FROM recipes r 
    LEFT JOIN recipes_ingredients ri ON r.id =ri.recipe_id
    LEFT JOIN ingredients i ON ri.ingredient_id = i.id
    `;
  if (userSearch)
    sql = `${sql} WHERE r.name like '%${userSearch}%' or '%${userSearch}' or '${userSearch}%' or '_${userSearch}%'
    or '${userSearch}_%' or '${userSearch}%${userSearch}'  `;
  console.log(sql);
  con.query(sql, (err, response) => {
    if (err) throw new Error(err.message);

    const result = _.chain(response)
      .groupBy("name")
      .map((item) => {
        const recipe = item[0];

        return {
          id: recipe.id,
          name: recipe.name,
          owner_id: recipe.owner_id,
          instruction: recipe.instruction,
          image:
            recipe.image == null
              ? null
              : `data:image/png;base64, ${Buffer.from(recipe.image, "base64")}`,
          date_added: recipe.date_added,
          date_modified: recipe.date_modified,
          ingredients: _.map(item, "ingredient_name"),
        };
      });
    res.json(result);
  });
};

exports.userrecipe = (req, res) => {
  const { id } = req.params;
  let sql = `
    SELECT r.*,i.id as ingredient_id,i.name as ingredient_name, users.full_name as ownerName, users.profile_picture as ownerImage FROM recipes r 
    LEFT JOIN recipes_ingredients ri ON r.id =ri.recipe_id
    LEFT JOIN ingredients i ON ri.ingredient_id = i.id
    JOIN users ON users.id = r.owner_id
    `;
  if (id) sql = `${sql} WHERE r.id=${id}`;
  con.query(sql, (err, response) => {
    if (err) throw new Error(err.message);

    const result = _.chain(response)
      .groupBy("name")
      .map((item) => {
        const recipe = item[0];

        return {
          id: recipe.id,
          name: recipe.name,
          owner_id: recipe.owner_id,
          instruction: recipe.instruction,
          image:
            recipe.image == null
              ? null
              : `data:image/png;base64,${recipe.image.toString("base64")}`,
          date_added: recipe.date_added,
          date_modified: recipe.date_modified,
          ingredients: _.map(item, "ingredient_name"),
          ownerName: recipe.ownerName,
          ownerImage: recipe.ownerImage
            ? `data:image/png;base64,${recipe.ownerImage.toString("base64")}`
            : null,
        };
      });
    res.json(result);
  });
};

exports.viewcomments = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT rc.comment,rc.date_added,u.full_name,u.profile_picture FROM recipe_comments rc JOIN users u ON rc.commentor_id=u.id WHERE recipe_id=? ORDER BY rc.date_added desc`;
  const values = [id];

  con.query(sql, [values], (err, result) => {
    console.log(result);
    res.json(result);
  });
};

exports.comment = (req, res) => {
  const { recipeId } = req.fields;
  const { commentorId } = req.fields;
  const { comment } = req.fields;
  const fullDate = util.getCurrentDate();

  const sql =
    "INSERT INTO recipe_comments (`commentor_id`,`recipe_id`,`comment`,`date_added`) VALUES (?)";
  const values = [commentorId, recipeId, comment, fullDate];

  con.query(
    "SELECT * FROM users WHERE id=?",
    [[commentorId]],
    (err, result) => {
      console.log(result);
      if (result != null) {
        con.query(
          "SELECT * FROM recipes WHERE id=?",
          [[recipeId]],
          (err1, result1) => {
            if (result1 != null) {
              con.query(sql, [values], () => {});
            } else {
              console.log("No such recipeId");
            }
          }
        );
      } else {
        console.log("No such userId");
      }
    }
  );
  res.end();
};

exports.recipeingredients = (req, res) => {
  const { id } = req.params;
  let sql = `SELECT re.id,re.name as 'name',ing.name as 'ingredientname' FROM recipes re JOIN recipes_ingredients re_ing ON re.id = re_ing.recipe_id JOIN ingredients ing  ON ing.id = re_ing.ingredient_id WHERE ingredient_id=? ORDER BY re.name`;

  console.log(sql);
  console.log(id);
  const values = [id];
  con.query(sql, [values], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
  if (id) sql = `${sql} WHERE r.id=${id}`;
  con.query(sql, (err, response) => {
    if (err) throw new Error(err.message);

    const result = _.chain(response)
      .groupBy("name")
      .map((item) => {
        const recipe = item[0];

        return {
          id: recipe.id,
          name: recipe.name,
          owner_id: recipe.owner_id,
          instruction: recipe.instruction,
          image:
            recipe.image == null
              ? null
              : `data:image/png;base64, ${Buffer.from(recipe.image, "base64")}`,
          date_added: recipe.date_added,
          date_modified: recipe.date_modified,
          ingredients: _.map(item, "ingredient_name"),
        };
      });
    res.json(result);
  });
};

exports.viewcomments = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT rc.comment,rc.date_added,u.full_name,u.profile_picture FROM recipe_comments rc JOIN users u ON rc.commentor_id=u.id WHERE recipe_id=? ORDER BY rc.date_added desc`;
  const values = [id];

  con.query(sql, [values], (err, result) => {
    console.log(result);
    res.json(result);
  });
};

exports.comment = (req, res) => {
  const { recipeId } = req.fields;
  const { commentorId } = req.fields;
  const { comment } = req.fields;
  const fullDate = util.getCurrentDate();

  const sql =
    "INSERT INTO recipe_comments (`commentor_id`,`recipe_id`,`comment`,`date_added`) VALUES (?)";
  const values = [commentorId, recipeId, comment, fullDate];

  con.query(
    "SELECT * FROM users WHERE id=?",
    [[commentorId]],
    (err, result) => {
      console.log(result);
      if (result != null) {
        con.query(
          "SELECT * FROM recipes WHERE id=?",
          [[recipeId]],
          (err1, result1) => {
            if (result1 != null) {
              con.query(sql, [values], () => {});
            } else {
              console.log("No such recipeId");
            }
          }
        );
      } else {
        console.log("No such userId");
      }
    }
  );
  res.end();
};

exports.deleterecipeingredient = (req, res) => {
  const { recipeId, id } = req.params;
  const sql = `DELETE FROM recipes_ingredients WHERE recipe_id=${recipeId} AND ingredient_id=${id}`;

  con.query(sql, (err) => {
    if (err) res.json(err);
    res.json(true);
  });
};

exports.recipeingredients = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT re.id,re.name as 'name',ing.name as 'ingredientname' FROM recipes re JOIN recipes_ingredients re_ing ON re.id = re_ing.recipe_id JOIN ingredients ing  ON ing.id = re_ing.ingredient_id WHERE ingredient_id=? ORDER BY re.name`;

  console.log(sql);
  console.log(id);
  const values = [id];
  con.query(sql, [values], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
};
