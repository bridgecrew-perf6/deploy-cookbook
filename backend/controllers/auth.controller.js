const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const con = require("../config/sql.config");
const util = require("../src/utils");

const getFullDate = () => {
  const d = new Date();
  return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
};

exports.register = function (req, res) {
  const username = req.fields.uname;
  const password = bcrypt.hashSync(req.fields.password, 8);
  const { name } = req.fields;
  let base64Image = null;
  if (req.files.image) {
    const imageFile = fs.openSync(req.files.image.path);
    base64Image = util.base64_encode(imageFile);
  }
  const picture = base64Image ? Buffer.from(base64Image, "base64") : null;
  const type = "Regular";
  const fullDate = getFullDate();

  const values = [name, username, password, picture, type, fullDate];

  const sql =
    "INSERT INTO users (`full_name`,`email`,`password_hash`,`profile_picture`,`type`,`date_added`) VALUES (?)";

  con.query(sql, [values], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(`Affected Rows!${result.affectedRows}`);
    res.send("Registered");
  });
};

exports.signin = (req, res) => {
  const { email } = req.fields;
  const { password } = req.fields;

  const sql = "SELECT * FROM users WHERE email = ?";
  con.query(sql, [email, password], (err, result) => {
    if (result[0] !== undefined) {
      if (err) throw err;
      const passwordIsValid = bcrypt.compareSync(
        req.fields.password,
        result[0].password_hash
      );
      if (passwordIsValid) {
        const user = result[0].id;
        const token = jwt.sign({ user }, "CookBookSecret", {
          expiresIn: 86400, // 24 hours
        });
        res.json({
          token,
          fullName: result[0].full_name,
          // profileImg: result[0].profile_picture,
          profileImg: result[0].profile_picture.toString("base64"),
          type: result[0].type,
        });
      }
    } else {
      res.send("User Not Exist");
    }
  });
};
