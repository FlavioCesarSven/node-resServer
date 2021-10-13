const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const {generarJWT} = require ('../helpers/generar-jws');
const Usuario = require('../models/usuario.model');


const login = async(req = request, res = response ) => {
    
    const { correo, password } = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne( { correo } );
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //si el usuario está activo
       
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado:false'
            });
        }

        //verificar la contraseña
        const validarPassword = bcryptjs.compareSync( password, usuario.password );

        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //generar el jwt
        const token =await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        })

    } catch (error) {

        console.log( error );
        return res.status(500).json({
            msg: "Hable con el Administrador"
        });
    }


}

module.exports = {
    login
}