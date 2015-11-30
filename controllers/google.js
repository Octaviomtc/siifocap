var request = require('superagent');

var _                     = require('underscore');


exports.zipcode = function(req, res) {
  var results = {};

  if (isNaN(req.params.code)) {
      results.message = "Ocurrio un problema al obtener la ubiacion.";
      return res.json({
        results : results,
        status : "error"
      });
  }

  if(req.params.code.length !=5){
    results.message = "Ocurrio un problema al obtener la ubiacion.";
    return res.json({
      results : results,
      status : "error"
    });
  }

  request
    .get('http://maps.googleapis.com/maps/api/geocode/json?address='+req.params.code+'&components=country:MX')
    .end(function(err, response){

      if(err || response.body.status!="OK"){
        results.message = "Ocurrio un problema al obtener la ubiacion.";
        return res.json({
          results : results,
          status : "error"
        });
      }

      var type = response.body.results[0].types[0];

      if(type!="postal_code"){
        results.message = "Ocurrio un problema al obtener la ubiacion.";
        return res.json({
          results : results,
          status : "error"
        });
      }

      results.formatted_address = response.body.results[0].formatted_address;
      results.colonia = response.body.results[0].address_components[1].long_name;
      results.cp = response.body.results[0].address_components[0].long_name;
      results.ciudad = response.body.results[0].address_components[2].long_name;
      results.estado = response.body.results[0].address_components[4].long_name;
      results.estado_abr = response.body.results[0].address_components[4].short_name;
      results.delegacion = response.body.results[0].address_components[3].long_name;
      results.pais = response.body.results[0].address_components[5].long_name

      console.log(response.body.results[0]);

      return res.json(
        {results : results,
        status : "ok"}
      );
      //return next();
    // Do something
  });
};
