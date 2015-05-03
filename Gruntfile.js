/*
Archivo que configura la lista de tareas
 */


 var env = process.env.NODE_ENV || 'development';

 //Carga de configuracion
 GLOBAL.config = config = require('./config/config')[env];


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


    mongoimport: {
      options: {
            db : config.name_db,
            host : config.host_db,
            port: '27017', //optional
            username : '', //optional
            password : '',  //optional
            stopOnError : false,  //optional
            collections : [
          {
            name : 'formacion',
            type : 'json',
            file : 'models/json/formacion.json',
            jsonArray : true,  //optional
            upsert : true,  //optional
            drop : true  //optional
          },
          {
            name : 'entidades',
            type : 'json',
            file : 'models/json/entidades.json',
            jsonArray : true,  //optional
            upsert : true,  //optional
            drop : true  //optional
          },
          {
            name : 'escuelas_privadas',
            type : 'json',
            file : 'models/json/escuelas_privadas.json',
            jsonArray : true,  //optional
            upsert : true,  //optional
            drop : true  //optional
          },
          {
            name : 'escuelas_publicas',
            type : 'json',
            file : 'models/json/escuelas_publicas.json',
            jsonArray : true,  //optional
            upsert : true,  //optional
            drop : true  //optional
          },
          {
            name : 'users',
            type : 'json',
            file : 'models/json/user.json',
            jsonArray : true,  //optional
            upsert : true,  //optional
            drop : true  //optional
          },
          {
            name : 'dependencia_unidad',
            type : 'json',
            file : 'models/json/dependencias.json',
            jsonArray : true,  //optional
            upsert : true,  //optional
            drop : true  //optional
          },
          {
            name : 'unidades_politecnicas',
            type : 'json',
            file : 'models/json/unidades_politecnicas.json',
            jsonArray : true,  //optional
            upsert : true,  //optional
            drop : true  //optional
          },
          {
            name : 'rol_usuario',
            type : 'json',
            file : 'models/json/roles.json',
            jsonArray : true,  //optional
            upsert : true,  //optional
            drop : true  //optional
          }

        ]
      }
    },

    watch: {
      compass: {
        files: ["lib/assets/sass/**/*.scss"],
        tasks: ["compass:dev"]
      }
    }
  });
  grunt.loadNpmTasks('grunt-mongoimport');
  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-docco");
  grunt.loadNpmTasks("grunt-codo");
  grunt.registerTask("default", ["nodemon:dev"]);
  grunt.registerTask("assets", ["watch:compass"]);
  grunt.registerTask("carga-inicial", ["mongoimport"]);
  grunt.registerTask("docs", ["docco:code"]);

  grunt.loadTasks("tasks");



  return grunt.registerTask("build", ["compass:dev"]);
};
