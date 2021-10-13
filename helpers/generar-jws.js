const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '') => {
    return new Promise( (resol, rejec)  => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if( err ){
                console.log( err );
                rejec( 'No se pudo Generar el Token' );
            }else{
                resol( token );
            }
        });


    })
}

module.exports = {
    generarJWT
}