var bCrypt = require('bcrypt-nodejs');




module.exports = function(grunt) {
  return grunt.registerTask('bcrypt', 'Encripta cadena', function(cadena) {
    console.log("Encripta cadena");

    var done = this.async();

    if (!cadena) {
      grunt.log.error('Falta cadena');
      return done(false);
    }


    console.log(bCrypt.hashSync(cadena));
    return done(true);


  });
};
