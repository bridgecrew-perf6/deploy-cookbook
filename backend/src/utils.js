const sharp = require("sharp");
const fs = require("fs");

const resizeImage = function (data) {
  return sharp(data).resize(1000, 1000).toFile("result_file.jpg");
};

const getCurrentDate = function () {
  const dateOb = new Date();
  const date = `0${dateOb.getDate()}`.slice(-2);
  const month = `0${dateOb.getMonth() + 1}`.slice(-2);
  const year = dateOb.getFullYear();
  const hours = dateOb.getHours();
  const minutes = dateOb.getMinutes();
  const seconds = dateOb.getSeconds();
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

// function to encode file data to base64 encoded string
const base64Encode = function (file) {
  // read binary data
  if (file == null) return null;
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString("base64");
};

// function to create file from base64 encoded string
const base64Decode = function (base64str, file) {
  // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
  const bitmap = Buffer.alloc(base64str, "base64");
  // write buffer to file
  fs.writeFileSync(file, bitmap);
  console.log("******** File created from base64 encoded string ********");
};

exports.resizeImage = resizeImage;
exports.base64_decode = base64Decode;
exports.base64_encode = base64Encode;
exports.getCurrentDate = getCurrentDate;
