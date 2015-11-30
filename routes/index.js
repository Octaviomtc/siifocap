var express         = require('express');
var multer          = require('multer'); //Multipart form
//Modelos
var escuela         = require('../models/escuela');
var acciones        = require('../models/acciones');
var dependencia     = require('../models/dependencia');
var rol             = require('../models/rol');
var participante    = require('../models/participante');
var evaluadores     = require('../models/evaluadores');
var facilitadores   = require('../models/facilitadores');
var formacion       = require('../models/formacion');
var entidades       = require('../models/entidades');
var escuelas_privadas = require('../models/escuelas_privadas');
var escuelas_publicas = require('../models/escuelas_publicas');
var dictaminacion = require('../models/dictaminacion');
var unidades_politecnicas = require('../models/unidades_politecnicas');
var disciplinas = require('../models/disciplinas');
//Controladores
var usuariosMid     = require('../controllers/usuarios');
var escuelaMid      = require('../controllers/escuelas');
var accionesMid     = require('../controllers/acciones');
var participMid     = require('../controllers/participantes');
var facilitadoresMid= require('../controllers/facilitadores');
var evaluadoresMid  = require('../controllers/evaluadores');
var formacionMid    = require('../controllers/formacion');
var entidadesMid    = require('../controllers/entidades');
var escuelas_privadasMid    = require('../controllers/escuelas_privadas');
var escuelas_publicasMid    = require('../controllers/escuelas_publicas');
var dictaminacionMid    = require('../controllers/dictaminacion');
var unidades_politecnicasMid    = require('../controllers/unidades_politecnicas');
var disciplinasMid = require('../controllers/disciplinas');
var programacionMid = require('../controllers/programacion');
var google = require('../controllers/google');


var router          = express.Router();

// Validadores Autenticacion
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

//  Validadores Autenticacion de Administrador
var isAuthenticatedAdmin = function (req, res, next) {
    if (req.isAuthenticated()) {
        if(req.user.rol=='admin') {
            return next();
        }
        res.redirect('/');
    }
    res.redirect('/');
}

module.exports = function(passport){
    // Home Index
    router.get('/', function(req, res) {
        if (req.user){
            res.redirect("/home");
        }
        res.render('app/login/index', {
            message: req.flash('message')
        });
    });

    // Formulario Login
    router.post('/login', passport.authenticate('login', {
          successRedirect: '/home',
          failureRedirect: '/',
          failureFlash : true
        })
    );


    // Pantalla Home Aplicacion
    router.get('/home', isAuthenticated, function(req, res){
        param={
            icon: "fa-home",
            seccion: "Presentación",
            estado: "home"
        };
        res.render('app/landing/index', {
          user: req.user,
          datos: param
        });
    });

    //Logout
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.post('/signout', function(req, res) {
        req.logout();
    });

    /*****************************************************************/
    // Rutas para panel de administracion
    router.get('/administracion', isAuthenticatedAdmin, usuariosMid.allUsers, function(req, res){
        param={
            icon: "fa-cogs",
            seccion: "Administración",
            estado: "administracion"
        }
        res.render('app/admin/admin', { message: req.flash('message'), user: req.user, datos: param});
    });


    /* GET Nuevo Usario */
    router.get('/administracion/usuarios/nuevo', isAuthenticatedAdmin, usuariosMid.allRoles, function(req, res){
        param={
            icon: "fa-cogs",
            seccion: "Administración",
            estado: "administracion"
        }
        res.render('app/usuarios/nuevo',{message: req.flash('message'), user: req.user, datos: param});
    });

    /* Handle Nuevo Usario POST */
    router.post('/administracion/usuarios/nuevo', isAuthenticatedAdmin,  passport.authenticate('signup', {
        successRedirect: '/administracion',
        failureRedirect: '/administracion/usuarios/nuevo',
        failureFlash : true
    }));

    router.get('/administracion/usuarios/borrar/:id', isAuthenticatedAdmin, usuariosMid.deleteUser, function(req, res){
        res.redirect('/administracion');
    });

    router.get('/administracion/usuarios/editar/:id', isAuthenticatedAdmin, usuariosMid.getUser, usuariosMid.allRoles, function(req, res){
        param={
            icon: "fa-cogs",
            seccion: "Administración",
            estado: "administracion"
        }
        res.render('app/usuarios/editar',{message: req.flash('message'), user: req.user, datos: param});
    });

    router.post('/administracion/usuarios/editar/:id', isAuthenticatedAdmin, usuariosMid.editUser, function(req, res){
        res.redirect('/administracion');
    });



    /*****************************************************************/
    //  UNIDADES ACADEMICAS
    router.get('/unidades', isAuthenticated, escuelaMid.findAllEscuelas, function(req, res){
        param={
            icon: "fa-building-o",
            seccion: "Unidades Politécnicas",
            estado: "unidades"

        }
        res.render('app/unidades/index', { message: req.flash('message'), user: req.user, datos: param});
    });

    router.get('/unidades/borrar/:id', isAuthenticated, escuelaMid.deleteEscuela, function(req, res){
        res.redirect('/unidades');
    });


    //Ver unidad
    router.get('/unidades/ver/:id', isAuthenticated, escuelaMid.findById, function(req, res){
       param={
            icon: "fa-building-o",
            seccion: res.locals.escuela.nombre,
            estado: "unidades"
        }

        res.render('app/unidades/ver',{message: req.flash('message'), user: req.user, datos: param});
    });


    //Ver unidades por dependencia
    // router.get('/unidades/ver/:id', isAuthenticated, escuelaMid.findById, function(req, res){
    //    param={
    //         icon: "fa-building-o",
    //         seccion: res.locals.escuela.nombre
    //     }

    //     res.render('app/unidades/ver',{message: req.flash('message'), user: req.user, datos: param});
    // });



    router.post('/unidades/consulta/dependencia', escuelaMid.findByDep, function(req, res){
    });


    router.get('/unidades/nueva', isAuthenticated, escuelaMid.findAllDependencias, function(req, res){
      param={
        icon: "fa-building-o",
        seccion: "Nueva unidad",
        estado: "unidades"
      }

      res.render('app/unidades/nueva',{message: req.flash('message'), user: req.user, datos: param});
    });

    router.post('/unidades/nueva', isAuthenticated, escuelaMid.addUnidad, function(req, res){
        res.redirect('/unidades');
    });

    //Actualizar unidad
    router.get('/unidades/actualizar/:id', isAuthenticated, escuelaMid.findById, escuelaMid.findAllDependencias, function(req, res){
       param={
            icon: "fa-building-o",
            seccion: res.locals.escuela.nombre,
            estado: "unidades"
        }

        res.render('app/unidades/editar',{message: req.flash('message'), user: req.user, datos: param});
    });



    router.post('/unidades/actualizar/:id', isAuthenticated, escuelaMid.updateUnidad, function(req, res){
        res.redirect('/unidades');
    });





    /*****************************************************************/
    //  ACCIONES DE FORMACIÓN
    //  Index de acciones de formacion se obtiene tabla con datos
    router.get('/acciones-formacion', isAuthenticated, accionesMid.allAccionFormacion, function(req, res){
        param={
            icon: "fa-archive",
            seccion: "Acciones de formación",
            estado: "acciones"
        }
        var alerta = req.flash('alert');
        console.log(alerta);
        res.render('app/acciones/index', { message: alerta, user: req.user, datos: param});
    });

    // nueva accion de formacion paso 1 initAccionFormacion
    router.get('/acciones-formacion/nueva/datos-generales', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, function(req, res){
       param={
            icon: "fa-plus-circle",
            seccion: "Nueva acción de formación",
            estado: "acciones",
            paso: "1"
        }

        res.render('app/acciones/nueva/datos-generales',{message: req.flash('message'), user: req.user, datos: param});
    });

    router.get('/acciones-formacion/nueva/init-accion', isAuthenticated, accionesMid.initAccionFormacion, function(req, res){
       param={
            icon: "fa-plus-circle",
            seccion: "Nueva acción de formación",
            estado: "acciones",
            paso: "1"
        }

        res.redirect("/acciones-formacion/nueva/"+res.accionFormacion._id+"/datos-generales")
    });


    router.post('/acciones-formacion/nueva/datos-generales', isAuthenticated, accionesMid.addAccionFormacion, function(req, res){
      res.set('Content-Type', 'application/javascript');
      res.redirect('/acciones-formacion/nueva/'+res.accionFormacion._id+'/datos-generales');
    });



    // nueva accion de formacion paso 1 despues del primer insert pasa a modo update
    router.get('/acciones-formacion/nueva/:id/datos-generales', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, accionesMid.findById, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nueva acción de formación",
        estado: "acciones",
        paso: "1"
      }

      res.render('app/acciones/actualizar/datos-generales',{message: req.flash('message'), user: req.user, datos: param});
    });


    // nueva accion de formacion paso 1 despues del primer insert pasa a modo update
    router.get('/acciones-formacion/ver/:id/datos-generales', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, accionesMid.findById, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nueva acción de formación",
        estado: "acciones",
        paso: "1"
      }

      res.render('app/acciones/actualizar/ver-datos-generales',{message: req.flash('message'), user: req.user, datos: param});
    });


    //update paso 1
    router.post('/acciones-formacion/nueva/:id/datos-generales', isAuthenticated, accionesMid.updateAccion, function(req, res){
      // console.log(res.accionFormacion);
      res.set('Content-Type', 'application/javascript');
      res.redirect('/acciones-formacion/nueva/'+res.accionFormacion._id+'/datos-generales');
    });



    //PASO 2 JUSTIFICACION
    router.get('/acciones-formacion/nueva/:id/justificacion', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, accionesMid.findById, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nueva acción de formación",
        estado: "acciones",
        paso: "2"
      }
      res.render('app/acciones/actualizar/justificacion',{message: req.flash('message'), user: req.user, datos: param});
    });

    router.get('/acciones-formacion/ver/:id/justificacion', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, accionesMid.findById, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nueva acción de formación",
        estado: "acciones",
        paso: "2"
      }
      res.render('app/acciones/actualizar/ver-justificacion',{message: req.flash('message'), user: req.user, datos: param});
    });

    //update paso 2
    router.post('/acciones-formacion/nueva/:id/justificacion', isAuthenticated, accionesMid.updateAccion, function(req, res){
      // console.log(res.accionFormacion);
      res.set('Content-Type', 'application/javascript');
      res.redirect('/acciones-formacion/nueva/'+res.accionFormacion._id+'/justificacion');
    });



    //PASO 3 Encuadre
    router.get('/acciones-formacion/nueva/:id/encuadre', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, accionesMid.findById, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nueva acción de formación",
        estado: "acciones",
        paso: "3"
      }
      res.render('app/acciones/actualizar/encuadre',{message: req.flash('message'), user: req.user, datos: param});
    });


    router.get('/acciones-formacion/ver/:id/encuadre', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, accionesMid.findById, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nueva acción de formación",
        estado: "acciones",
        paso: "3"
      }
      res.render('app/acciones/actualizar/ver-encuadre',{message: req.flash('message'), user: req.user, datos: param});
    });

    //update paso 3
    router.post('/acciones-formacion/nueva/:id/encuadre', isAuthenticated, accionesMid.updateAccion, function(req, res){
      // console.log(res.accionFormacion);
      res.set('Content-Type', 'application/javascript');
      res.redirect('/acciones-formacion/nueva/'+res.accionFormacion._id+'/encuadre');
    });



    //PASO 4 Encuadre
    router.get('/acciones-formacion/nueva/:id/planeacion', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, accionesMid.findById, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nueva acción de formación",
        estado: "acciones",
        paso: "4"
      }
      res.render('app/acciones/actualizar/planeacion',{message: req.flash('message'), user: req.user, datos: param});
    });

    router.get('/acciones-formacion/ver/:id/planeacion', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, accionesMid.findById, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nueva acción de formación",
        estado: "acciones",
        paso: "4"
      }
      res.render('app/acciones/actualizar/ver-planeacion',{message: req.flash('message'), user: req.user, datos: param});
    });

    //update paso 4
    router.post('/acciones-formacion/nueva/:id/planeacion', isAuthenticated, accionesMid.updateAccion, function(req, res){
      // console.log(res.accionFormacion);
      res.set('Content-Type', 'application/javascript');
      res.redirect('/acciones-formacion/nueva/'+res.accionFormacion._id+'/planeacion');
    });



    //update paso 4 AGREGAR PLANEACION DIDACTICA

    // se configura para recibir archivos temporales
    router.post('/acciones-formacion/nueva/:id/planeacion/didactica', isAuthenticated, multer({
      dest: __dirname+ "/.."+"/temp/uploads/acciones_formacion/planeacion_didactica"
    }));

    router.post('/acciones-formacion/nueva/:id/planeacion/didactica', isAuthenticated, accionesMid.addPlaneacionDidactica, function(req, res){
      // console.log(res.accionFormacion);
      res.redirect('/acciones-formacion/nueva/'+res.accionFormacion._id+'/planeacion');
    });






    //Borrar una accion de formacion
    router.get('/acciones-formacion/borrar/:id', isAuthenticated, accionesMid.deleteAccion, function(req, res){
      res.redirect('/acciones-formacion');
    });


    router.get('/acciones-formacion/nueva/:id/finalizar', isAuthenticated, accionesMid.updateAccion, function(req, res){
      // console.log(res.accionFormacion);
      res.set('Content-Type', 'application/javascript');
      res.redirect('/acciones-formacion');
    });


    /*****************************************************************/
    //  PRROGRAMACION
    //  Index de acciones de formacion se obtiene tabla con datos
    router.get('/programacion', isAuthenticated, accionesMid.allAccionFormacion, function(req, res){
        param={
            icon: "fa-calendar",
            seccion: "Programación de Acciones de formación",
            estado: "programacion"
        }
        var alerta = req.flash('alert');
        console.log(alerta);
        res.render('app/programacion/index', { message: alerta, user: req.user, datos: param});
    });



    //Nueva programación
    router.get('/programacion/crear', isAuthenticated, accionesMid.allAccionFormacion, function(req, res){
        param={
            icon: "fa-calendar",
            seccion: "Programación de Acciones de formación - Nueva programación",
            estado: "programacion"
        }
        var alerta = req.flash('alert');
        res.render('app/programacion/crear', { message: alerta, user: req.user, datos: param});
    });


    router.get('/programacion/:id/crear-programacion', isAuthenticated, programacionMid.crear, function(req, res){
        res.redirect('/programacion/paso1/'+encrypt(res.accionFormacion.id)+'/'+encrypt(res.last_programacion.id));
        // res.redirect('/programacion/paso1/'+encrypt(res.accionFormacion.id)+'/'+encrypt(res.last_programacion.id));
    });


    router.get('/programacion/paso1/:id/:id2', isAuthenticated, accionesMid.allAccionFormacion, programacionMid.validateAccion, function(req, res){
        param={
            icon: "fa-calendar",
            seccion: "Programación de Acciones de formación - Nueva programación",
            estado: "programacion",
            paso: 1
        }
        var alerta = req.flash('alert');
        res.render('app/programacion/paso1', { message: alerta, user: req.user, datos: param});


    });

    router.post('/programacion/paso2/:id/:id2', isAuthenticated, accionesMid.allAccionFormacion, programacionMid.validateAccion, programacionMid.update2, function(req, res){  
        console.log("updating");
        console.log(res.accionFormacion._id);
        console.log(res.programacionId);
        res.redirect('/programacion/paso3/'+encrypt(res.accionFormacion.id)+'/'+encrypt(res.programacionId));
    });

     router.get('/programacion/paso2/:id/:id2', isAuthenticated, accionesMid.allAccionFormacion, programacionMid.validateAccion, function(req, res){
        param={
            icon: "fa-calendar",
            seccion: "Programación de Acciones de formación - Nueva programación",
            estado: "programacion",
            paso: 2
        }
        var alerta = req.flash('alert');
        res.render('app/programacion/paso2', { message: alerta, user: req.user, datos: param});


    });

      router.get('/programacion/paso3/:id/:id2', isAuthenticated, accionesMid.allAccionFormacion, programacionMid.validateAccion, function(req, res){
        param={
            icon: "fa-calendar",
            seccion: "Programación de Acciones de formación - Nueva programación",
            estado: "programacion",
            paso: 3
        }
        var alerta = req.flash('alert');
        res.render('app/programacion/paso3', { message: alerta, user: req.user, datos: param});


    });

       router.get('/programacion/paso4/:id/:id2', isAuthenticated, accionesMid.allAccionFormacion, programacionMid.validateAccion, function(req, res){
        param={
            icon: "fa-calendar",
            seccion: "Programación de Acciones de formación - Nueva programación",
            estado: "programacion",
            paso: 4
        }
        var alerta = req.flash('alert');
        res.render('app/programacion/paso4', { message: alerta, user: req.user, datos: param});


    });

    router.get('/programacion/paso5/:id/:id2', isAuthenticated, accionesMid.allAccionFormacion, programacionMid.validateAccion, function(req, res){
        param={
            icon: "fa-calendar",
            seccion: "Programación de Acciones de formación - Nueva programación",
            estado: "programacion",
            paso: 5
        }
        var alerta = req.flash('alert');
        res.render('app/programacion/paso5', { message: alerta, user: req.user, datos: param});


    });





    /*****************************************************************/
    // SECCIÓN PARTICIPANTES



    router.get('/participantes', isAuthenticated, participMid.allParticipantes, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Participantes",
        estado: "participantes"
      }
      var alerta = req.flash('message');
      res.render('app/participantes/index',{message: alerta, user: req.user, datos: param});
    });

    router.get('/participantes/nuevo', isAuthenticated, accionesMid.allAccionFormacion, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, entidadesMid.findAllEntidades, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nuevo Participante",
        estado: "participantes"
      }
      res.render('app/participantes/nuevo',{message: req.flash('message'), user: req.user, datos: param});
    });

    router.post('/participantes/nuevo', isAuthenticated, participMid.findCurp, participMid.addParticipante, function (req, res){
      res.set('Content-Type', 'application/javascript');
      res.redirect('/participantes');
    });

    router.get('/participantes/borrar/:id', isAuthenticated, participMid.deleteParticipante, function(req, res){
      res.redirect('/participantes');
    });


    router.get('/participantes/ver/:id', isAuthenticated, participMid.findById, entidadesMid.findAllEntidades, function(req, res){
      param={
        icon: "fa-building-o",
        seccion: res.locals.participante.apellidos +  ", "+  res.locals.participante.nombre
      }
      res.render('app/participantes/ver',{message: req.flash('message'), user: req.user, datos: param});
    });

    router.get('/participantes/actualizar/:id', isAuthenticated, accionesMid.allAccionFormacion, participMid.findById,  escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias,  entidadesMid.findAllEntidades, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Actualizar Participante"
      }
      res.render('app/participantes/editar',{message: req.flash('message'), user: req.user, datos: param});
    });


    router.post('/participantes/actualizar/:id', isAuthenticated, participMid.updateParticipante, function (req, res){
      res.set('Content-Type', 'application/javascript');
      res.redirect('/participantes');
    });



    /*****************************************************************/
    // SECCIÓN FACILITADORES
    router.get('/facilitadores', isAuthenticated, facilitadoresMid.allFacilitadores, accionesMid.allAccionFormacion, escuelaMid.findAllEscuelas, entidadesMid.findAllEntidades, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Facilitadores",
        estado: "facilitadores"
      }
      res.render('app/facilitadores/index',{message: req.flash('message'), user: req.user, datos: param});
    });


    //Borrar
    router.get('/facilitadores/borrar/:id', isAuthenticated, facilitadoresMid.deleteFacilitador, function(req, res){
      res.redirect('/facilitadores');
    });


     router.get('/facilitadores/crear/init-facilitador', isAuthenticated, facilitadoresMid.initFacilitadores, function(req, res){
       param={
            icon: "fa-plus-circle",
            seccion: "Nuevo facilitador",
            estado: "facilitadores",
            paso: "1"
        }

        res.redirect("/facilitadores/"+res.facilitadores._id+"/datos-personales")
    });


    // nuevo facilitador paso 1 actualizar
    router.get('/facilitadores/:id/datos-personales', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, facilitadoresMid.findById, entidadesMid.findAllEntidades, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nuevo facilitador",
        estado: "facilitadores",
        paso: "1"
      }

      res.render('app/facilitadores/actualizar/datos-personales',{message: req.flash('message'), user: req.user, datos: param});
    });


    router.post('/facilitadores/:id/datos-personales', isAuthenticated, facilitadoresMid.updateFacilitador, function(req, res){
      res.set('Content-Type', 'application/javascript');
      res.redirect("/facilitadores/"+res.facilitadores._id+"/datos-personales");
    });


    // nuevo facilitador paso 2 actualizar
    router.get('/facilitadores/:id/formacion-academica', isAuthenticated, facilitadoresMid.findById, disciplinasMid.findAllDisciplinas, formacionMid.findAllFormacion, entidadesMid.findAllEntidades, escuelas_privadasMid.findAllEscuelas, escuelas_publicasMid.findAllEscuelas, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nuevo facilitador",
        estado: "facilitadores",
        paso: "2"
      }

      res.render('app/facilitadores/actualizar/formacion-academica',{message: req.flash('message'), user: req.user, datos: param});
    });


    // se configura para recibir archivos temporales
    router.post('/facilitadores/:id/formacion-academica', isAuthenticated, multer({
      dest: __dirname+ "/.."+"/temp/uploads/facilitadores/files"
    }));

    router.post('/facilitadores/:id/formacion-academica', isAuthenticated, facilitadoresMid.updateFacilitador, function(req, res){
      res.redirect("/facilitadores/"+res.facilitadores._id+"/formacion-academica");
    });



    // nuevo facilitador paso 3 actualizar
    router.get('/facilitadores/:id/experiencia-profesional', isAuthenticated, facilitadoresMid.findById, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, formacionMid.findAllFormacion, entidadesMid.findAllEntidades, escuelas_privadasMid.findAllEscuelas, escuelas_publicasMid.findAllEscuelas, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nuevo facilitador",
        estado: "facilitadores",
        paso: "3"
      }

      res.render('app/facilitadores/actualizar/experiencia-profesional',{message: req.flash('message'), user: req.user, datos: param});
    });


    // se configura para recibir archivos temporales
    router.post('/facilitadores/:id/experiencia-profesional', isAuthenticated, multer({
      dest: __dirname+ "/.."+"/temp/uploads/facilitadores/files"
    }));

    router.post('/facilitadores/:id/experiencia-profesional', isAuthenticated, facilitadoresMid.updateFacilitador, function(req, res){
      res.redirect("/facilitadores/"+res.facilitadores._id+"/experiencia-profesional");
    });






    /*****************************************************************/
    // SECCIÓN EVALUADORES
    router.get('/evaluadores', isAuthenticated, evaluadoresMid.allEvaluadores, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Evaluadores",
        estado: "evaluadores"
      }
      res.render('app/evaluadores/index',{message: req.flash('message'), user: req.user, datos: param});
    });

    //Borrar
    router.get('/evaluadores/borrar/:id', isAuthenticated, evaluadoresMid.deleteEvaluador, function(req, res){
      res.redirect('/evaluadores');
    });



    // nuevo evaluador paso 1
    // router.get('/evaluadores/crear/datos-personales', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, entidadesMid.findAllEntidades, function(req, res){
    //   param={
    //     icon: "fa-plus-circle",
    //     seccion: "Nuevo evaluador",
    //     estado: "evaluadores",
    //     paso: "1"
    //   }

    //   res.render('app/evaluadores/nuevo/datos-personales',{message: req.flash('message'), user: req.user, datos: param});
    // });


    // router.post('/evaluadores/crear/datos-personales', isAuthenticated, evaluadoresMid.addEvaluadores, function(req, res){
    //   res.set('Content-Type', 'application/javascript');
    //   res.redirect("/evaluadores/"+res.evaluadores._id+"/datos-personales");
    // });


     router.get('/evaluadores/crear/init-evaluador', isAuthenticated, evaluadoresMid.initEvaluadores, function(req, res){
       param={
            icon: "fa-plus-circle",
            seccion: "Nuevo evaluador",
            estado: "evaluadores",
            paso: "1"
        }

        res.redirect("/evaluadores/"+res.evaluadores._id+"/datos-personales")
    });


    // nuevo evaluador paso 1 actualizar
    router.get('/evaluadores/:id/datos-personales', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, evaluadoresMid.findById, entidadesMid.findAllEntidades, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nuevo evaluador",
        estado: "evaluadores",
        paso: "1"
      }

      res.render('app/evaluadores/actualizar/datos-personales',{message: req.flash('message'), user: req.user, datos: param});
    });


    router.post('/evaluadores/:id/datos-personales', isAuthenticated, evaluadoresMid.updateEvaluador, function(req, res){
      res.set('Content-Type', 'application/javascript');
      res.redirect("/evaluadores/"+res.evaluadores._id+"/datos-personales");
    });


    // nuevo evaluador paso 2 actualizar
    router.get('/evaluadores/:id/formacion-academica', isAuthenticated, evaluadoresMid.findById, formacionMid.findAllFormacion, entidadesMid.findAllEntidades, escuelas_privadasMid.findAllEscuelas, escuelas_publicasMid.findAllEscuelas, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nuevo evaluador",
        estado: "evaluadores",
        paso: "2"
      }

      res.render('app/evaluadores/actualizar/formacion-academica',{message: req.flash('message'), user: req.user, datos: param});
    });


    // se configura para recibir archivos temporales
    router.post('/evaluadores/:id/formacion-academica', isAuthenticated, multer({
      dest: __dirname+ "/.."+"/temp/uploads/evaluadores/files"
    }));

    router.post('/evaluadores/:id/formacion-academica', isAuthenticated, evaluadoresMid.updateEvaluador, function(req, res){
      res.redirect("/evaluadores/"+res.evaluadores._id+"/formacion-academica");
    });



    // nuevo evaluador paso 3 actualizar
    router.get('/evaluadores/:id/experiencia-laboral', isAuthenticated, evaluadoresMid.findById, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, formacionMid.findAllFormacion, entidadesMid.findAllEntidades, escuelas_privadasMid.findAllEscuelas, escuelas_publicasMid.findAllEscuelas, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nuevo evaluador",
        estado: "evaluadores",
        paso: "3"
      }

      res.render('app/evaluadores/actualizar/experiencia-laboral',{message: req.flash('message'), user: req.user, datos: param});
    });


    // se configura para recibir archivos temporales
    router.post('/evaluadores/:id/experiencia-laboral', isAuthenticated, multer({
      dest: __dirname+ "/.."+"/temp/uploads/evaluadores/files"
    }));

    router.post('/evaluadores/:id/experiencia-laboral', isAuthenticated, evaluadoresMid.updateEvaluador, function(req, res){
      res.redirect("/evaluadores/"+res.evaluadores._id+"/experiencia-laboral");
    });


    // nuevo evaluador paso 4 actualizar
    router.get('/evaluadores/:id/experiencia-evaluador', isAuthenticated, evaluadoresMid.findById, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, formacionMid.findAllFormacion, entidadesMid.findAllEntidades, escuelas_privadasMid.findAllEscuelas, escuelas_publicasMid.findAllEscuelas, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nuevo evaluador",
        estado: "evaluadores",
        paso: "4"
      }

      res.render('app/evaluadores/actualizar/experiencia-evaluador',{message: req.flash('message'), user: req.user, datos: param});
    });


    // se configura para recibir archivos temporales
    router.post('/evaluadores/:id/experiencia-evaluador', isAuthenticated, multer({
      dest: __dirname+ "/.."+"/temp/uploads/evaluadores/files"
    }));

    router.post('/evaluadores/:id/experiencia-evaluador', isAuthenticated, evaluadoresMid.updateEvaluador, function(req, res){
      res.redirect("/evaluadores/"+res.evaluadores._id+"/experiencia-evaluador");
    });

    // FINALIZA EVALUADOR
    router.get('/evaluadores/:id/finalizar', isAuthenticated, evaluadoresMid.updateEvaluador, function(req, res){
      // console.log(res.accionFormacion);
      res.set('Content-Type', 'application/javascript');
      res.redirect('/evaluadores');
    });




    //************************************************ DICTAMINACION
    router.get('/dictaminacion', isAuthenticated, accionesMid.allAccionFormacion, function(req, res){
      param={
        icon: "fa-gavel",
        seccion: "Dictaminación",
        estado: "dictaminacion"
      }
      res.render('app/dictaminacion/index',{message: req.flash('message'), user: req.user, datos: param});
    });


    router.get('/dictaminacion/:id', isAuthenticated, accionesMid.findById, accionesMid.findByIdDictaminacion, function(req, res){
      param={
        icon: "fa-gavel",
        seccion: "Dictaminación",
        estado: "dictaminacion"
      }
      res.render('app/dictaminacion/nueva',{message: req.flash('message'), user: req.user, datos: param});
    });




    router.post('/dictaminacion/:id', isAuthenticated, dictaminacionMid.addDictamen, function(req, res){
      res.redirect("/dictaminacion")
    });



    //************************************************ CATALOGOS
    //CLASIFICACION DE ESCUELAS
    router.post('/formacion/consulta/campo_especifico', formacionMid.findCampoEspecifico, function(req, res){
    });

    router.post('/formacion/consulta/carrera', formacionMid.findCampoCarrera, function(req, res){
    });

    //ENTIDADES FEDERATIVAS -- Error
    router.post('/entidades/catalogo', entidadesMid.findAllEntidades, function(req, res){
    });


    //DOCUMENTO DE REFERENCIAS APA
    router.get('/referencias-apa', function(req, res){
      // console.log(config);
      res.download(config.root+"/uploads/referencias_apa.pdf")
    });

    //************************************************ RECUPERAR CONTRASEÑA
    router.get('/recuperar-contrasena', function(req, res){
      if (req.user){
            res.redirect("/home");
        }
        res.render('app/login/recuperar-contrasena', {
            message: req.flash('message')
        });
    });

    //************************************************ CODIGO POSTAL
    router.get('/zipcode/:code', google.zipcode, function(req, res){
    });



    return router;
}
