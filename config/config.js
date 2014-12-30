var path = require('path');

var root = path.normalize(__dirname+"/..");

var config = {};



// AMBIENTE DE DESAROLLO
config.development = {
  root:           root,
  db:             "mongodb://localhost/test_siffocap",
  env:            "development",
  port:           process.env.PORT || 5000
};




// AMBIENTE DE PRODUCCION
config.production = {
  root:           root,
  db:             "mongodb://localhost/siffocap",
  env:            "production",
  port:           process.env.PORT || 8080
};




module.exports = config;
