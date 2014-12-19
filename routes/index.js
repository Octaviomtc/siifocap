var express         = require('express');
//Modelos
var escuela         = require('../models/escuela');
var acciones         = require('../models/acciones');
var dependencia     = require('../models/dependencia');
var rol             = require('../models/rol');
//Controladores
var usuariosMid     = require('../controllers/usuarios');
var escuelaMid      = require('../controllers/escuelas');
var accionesMid     = require('../controllers/acciones');
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
            seccion: "Presentación"
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

    /*****************************************************************/

    // Rutas para panel de administracion
    router.get('/administracion', isAuthenticatedAdmin, usuariosMid.allUsers, function(req, res){
        param={
            icon: "fa-cogs",
            seccion: "Administración"
        }
        res.render('app/admin/admin', { message: req.flash('message'), user: req.user, datos: param});
    });


    /* GET Nuevo Usario */
    router.get('/administracion/usuarios/nuevo', isAuthenticatedAdmin, usuariosMid.allRoles, function(req, res){
        param={
            icon: "fa-cogs",
            seccion: "Administración"
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

    /*****************************************************************/
    //  UNIDADES ACADEMICAS
    router.get('/unidades', isAuthenticated, escuelaMid.findAllEscuelas, function(req, res){
        param={
            icon: "fa-building-o",
            seccion: "Unidades Politécnicas"
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
            seccion: res.locals.escuela.nombre
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
        seccion: "Nueva unidad"
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
            seccion: res.locals.escuela.nombre
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
            seccion: "Acciones de formación"
        }
        res.render('app/acciones/index', { message: req.flash('message'), user: req.user, datos: param});
    });

    // nueva accion de formacion paso 1
    router.get('/acciones-formacion/nueva/datos-generales', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, function(req, res){
       param={
            icon: "fa-plus-circle",
            seccion: "Nueva acción de formación"
        }

        res.render('app/acciones/nueva/datos-generales',{message: req.flash('message'), user: req.user, datos: param});
    });


    router.post('/acciones-formacion/nueva/datos-generales', isAuthenticated, accionesMid.addAccionFormacion, function(req, res){
      res.set('Content-Type', 'application/javascript');
      res.redirect('/acciones-formacion/nueva/'+res.accionFormacion._id+'/datos-generales');
    });



    // nueva accion de formacion paso 1 despues del primer insert pasa a modo update
    router.get('/acciones-formacion/nueva/:id/datos-generales', isAuthenticated, escuelaMid.findAllEscuelas, escuelaMid.findAllDependencias, accionesMid.findById, function(req, res){
      param={
        icon: "fa-plus-circle",
        seccion: "Nueva acción de formación"
      }

      res.render('app/acciones/actualizar/datos-generales',{message: req.flash('message'), user: req.user, datos: param});
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
        seccion: "Nueva acción de formación"
      }
      res.render('app/acciones/actualizar/justificacion',{message: req.flash('message'), user: req.user, datos: param});
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
        seccion: "Nueva acción de formación"
      }
      res.render('app/acciones/actualizar/encuadre',{message: req.flash('message'), user: req.user, datos: param});
    });

    //update paso 2
    router.post('/acciones-formacion/nueva/:id/encuadre', isAuthenticated, accionesMid.updateAccion, function(req, res){
      // console.log(res.accionFormacion);
      res.set('Content-Type', 'application/javascript');
      res.redirect('/acciones-formacion/nueva/'+res.accionFormacion._id+'/encuadre');
    });



    return router;
}
