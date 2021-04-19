// const express = require( 'express' );
import express from 'express';
import router from './routes/index.js';
import db from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config( { path:"variables.env" } );

const app = express();

// Conectar la base de datos
db.authenticate()
    .then( () => console.log( 'Base de datos conectada' ) )
    .catch( err => console.log( 'Error al conectarse a la bd' ) );

// Puerto y host para la app
// Definir puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

// Habilitar pug
app.set( 'view engine', 'pug' );

// Obtener el año actual
app.use( ( request, response, next ) => {
    
    // Para pasar de un archivo hacia otro, express usa una variable llamada "locals"    
    // response.locals.unaVariable = 'Una nueva variable';

    const year = new Date().getFullYear();
    response.locals.nombreSitio = 'Agencia de Viajes';

    response.locals.actualYear = year;

    next();
} );

// Agregar body parser para leer los datos del formulario
app.use( express.json() );
app.use( express.urlencoded( { urlencoded: true } ) );

// Definir la carpeta pública
app.use( express.static( 'public' ) );

// AgregAar router
app.use( '/', router );

app.listen( port, host, () => {
    console.log( `El servidor está funcionando en el puerto ${ port }` );
} );