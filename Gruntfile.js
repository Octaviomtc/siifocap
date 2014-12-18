/*
Archivo que configura la lista de tareas
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    nodemon: {
      dev: {
        script: "./bin/www"
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: "lib/assets/sass",
          importPath: ["public/vendor"],
          imagesDir: "public/images",
          cssDir: "public/stylesheets",
          javascriptsDir: "public/javascript",
          fontsDir: "public/fonts",
          outputStyle: "compact",
          noLineComments: true
        }
      }
    },
    watch: {
      compass: {
        files: ["lib/assets/sass/**/*.scss"],
        tasks: ["compass:dev"]
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-docco");
  grunt.loadNpmTasks("grunt-codo");
  grunt.registerTask("default", ["nodemon:dev"]);
  grunt.registerTask("assets", ["watch:compass"]);
  grunt.registerTask("docs", ["docco:code"]);
  return grunt.registerTask("build", ["compass:dev"]);
};
