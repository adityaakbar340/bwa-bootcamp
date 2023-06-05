// Import Moongose
const mongoose = require("mongoose");

// Import configurasi terkait MongoDB dari app/config/index.js
const { urlDb } = require("../config");

mongoose.set("strictQuery", false);
// connect ke MongoDB menggunakan konfigurasi yang telah kita import
mongoose.connect(urlDb);

// Simpan koneksi dalam constant db
const db = mongoose.connection;

// export db supaya bisa digunakan oleh file lain yang membutuhkan
module.exports = db;
