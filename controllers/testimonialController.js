import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async ( request, response ) => {

    // request.body va a ser lo que el usuario coloque en el formulario

    // Validar
    const { nombre, correo, mensaje } = request.body;
    const errores = [];

    if ( nombre.trim() === '' ) {
        errores.push( { mensaje: 'El nombre está vacio' } );
    }

    if ( correo.trim() === '' ) {
        errores.push( { mensaje: 'El correo está vacio' } );
    }

    if ( mensaje.trim() === '' ) {
        errores.push( { mensaje: 'El mensaje está vacio' } );
    }

    if( errores.length > 0 ){

        // Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        // Mostrar la vista con errores
        response.render( 'testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        } );
    }

    else{

        // Almacenarlo en la bd
        try {

            await Testimonial.create( {
                nombre,
                correo,
                mensaje,
            } );

            response.redirect( '/testimoniales' );
        }
        
        catch (error) {
            console.log( error );    
        }
    }
}

export{
    guardarTestimonial
}