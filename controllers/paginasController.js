import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

export const paginaInicio = async( request, response ) => {

    const promiseDB = [];

    // Consultar 3 viajes del modelo viaje
    promiseDB.push( Viaje.findAll( { limit: 3 } ) );
    promiseDB.push( Testimonial.findAll( { limit: 3 } ) );

    try {

        const resultado = await Promise.all( promiseDB );

        response.render( 'inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[ 0 ],
            testimoniales: resultado[ 1 ],
        } );
        
    } 
    
    catch (error) {
        console.log( error );
    }
};

export const paginaNosotros = ( request, response ) => {

    response.render( 'nosotros', {
        pagina: 'Nosotros'
    } );
};

export const paginaViajes = async ( request, response ) => {

    // Consultar BD
    const viajes = await Viaje.findAll();
    console.log( viajes );

    response.render( 'viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    } );
};

export const paginaTestimoniales = async ( request, response ) => {

    try {

        const testimoniales = await Testimonial.findAll();

        response.render( 'testimoniales', {
            pagina: 'Testimoniales',
            testimoniales,
        } );

        console.log( 'Testimoniales:',  testimonales );
        
    } 
    
    catch (error) {
        console.log( error );
    }

    
};

// Muestra un viaje por su slug
// params se asocia con el comodin que se definio en el router
export const paginaDetalleViaje = async ( request, response, next )  => {

    const { slug } = request.params;

    try {

        const viaje = await Viaje.findOne( { where: { slug } } );

        response.render( 'viaje', {
            pagina: 'Información Viaje',
            viaje,
        } )
    } 
    
    catch ( error ) {
        console.log( error );
    }
}

/*export{
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales
}*/