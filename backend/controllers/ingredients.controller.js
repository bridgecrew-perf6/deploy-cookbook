const _ = require("lodash");
const con = require("../config/sql.config");

exports.saveingredients = (req, res) => {
  // var formData = req.body;
  console.log(req.fields);
  const { fname } = req.fields;

  const response = {
    data: {},
    msg: "",
    error: false,
  };
  let sql = "SELECT name FROM ingredients WHERE name = ? ";
  console.log(sql);
  con.query(sql, [fname], (err, result) => {
    if (result && result.length > 0) {
      if (err) throw err;
      response.msg = "Already exist";
      response.error = true;
      res.json(response);
      return;
    }

    sql = `INSERT INTO ingredients (name)  VALUES ('${fname}')`;
    console.log(sql);
    con.query(sql, (err1, response1) => {
      if (err1) throw err1;
      console.log("ingredients Added Successfully!!");
      res.json(response1);
    });
  });
};

exports.ingredients = (req, res) => {
  const sql = "SELECT * FROM ingredients ORDER BY name ASC";
  con.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(data);
      // console.log(data);
    }
  });
};

exports.recipeingredients = (req, res) => {
  const { id } = req.params;
  let sql = `select r.id as 'recipe_id',r.name as 'recipe_name',i.id,i.name from ingredients i
    left join recipes_ingredients ri on i.id=ri.ingredient_id
    left join recipes r on ri.recipe_id = r.id`;

  console.log(sql);
  console.log(id);
  if (id) {
    sql = `${sql} where i.id=${id}`;
  }

  sql = `${sql} ORDER BY r.name`;
  const values = [id];
  con.query(sql, [values], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      const result = _.chain(response)
        .groupBy("name")
        .map((item) => {
          const ingredient = item[0];
          return {
            id: ingredient.id,
            name: ingredient.name,
            recipes: _.map(item, (data) =>
              data.recipe_id
                ? { id: data.recipe_id, name: data.recipe_name }
                : null
            ).filter((x) => x && x.id),
          };
        });

      res.send(result);
      console.log(result);
    }
  });
};

exports.deleterecipeingredient = (req, res) => {
  const { recipeId, id } = req.params;
  const sql = `DELETE FROM recipes_ingredients WHERE recipe_id=${recipeId} AND ingredient_id=${id}`;

  con.query(sql, (err) => {
    if (err) res.json(err);
    res.json(true);
  });
};

exports.updateIngredient = (request, response) => {
  const { id } = request.params;
  const newName = request.fields.name;
  const sql = `UPDATE ingredients set name= ? where id = ?`;
  con.query(sql, [newName, id], (err, data) => {
    if (err)
      response.json({
        status: "Failed",
        message: "Database Error",
        error: err,
      });
    if (data.changedRows > 0)
      response.json({
        status: "Success",
      });
    else
      response.json({
        status: "Failed",
        message: "Ingredient ID not Found",
      });
    console.log(data);
  });
  // console.log(request.fields.name)
  // const newName = request.body
};
exports.deleteingredient = (req, res) => {
  const { id } = req.params;

  // DELETE FROM `recipes_ingredients` WHERE `ingredient_id` =
  // const sql = `DELETE FROM ingredients WHERE id=${id}`;

  let sql = `DELETE FROM recipes_ingredients WHERE ingredient_id = ${id}`;

  con.query(sql, (err) => {
    if (err) {
      res.json({
        status: "Failed",
        message: "Database Error",
        error: err,
      });
    } else {
      sql = `DELETE FROM ingredients WHERE id=${id}`;
      con.query(sql, (err2) => {
        if (err2)
          res.json({
            status: "Failed",
            message: "Database Error",
          });
        else
          res.json({
            status: "success",
          });
      });
    }
  });
};
