# SIIFoCAP IPN

Sistema de Información Institucional para el programa de Formación, Capacitación, Actualización y Producción "SIIFoCAP".

Paara ver la demo visita: [http://www.coredev.io:3000](http://www.coredev.io:3000)



## Instalación

### Requisitos previos

* Node JS versión recomendada 0.10.32 ó superior [Documentación](http://nodejs.org/download/)
* MongoDB versión recomendada 2.4.6 ó superior [Documentación](http://www.mongodb.org/downloads)
* Manejador de paqutes Bower `npm install -g bower` [Documentación](http://bower.io/)
* Administrador de tareas Grunt `npm install -g grunt-cli` [Documentación](http://gruntjs.com/getting-started)


### Instalando dependencias
* Paquetes de mpm necesarios `npm install`
* Dependencias `bower install`


### Configurando entorno

En el archivo `/config/config.js` se configuran los parametros de la base y el puerto de ejecución


### Inicializando bases

Ejecutar el comando `grunt carga-inical`esto inicializa las bases y genera el primer usuario admin

## Iniciando Aplicación
La aplicacón corre bajo el administrador de tareas Grunt por lo que solo es necesario el comando `grunt`
