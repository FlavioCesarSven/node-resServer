const { response, request, json } = require('express');
const bcryptjs = require('bcryptjs');

const {generarJWT} = require ('../helpers/generar-jws');
const Usuario = require('../models/usuario.model');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignIn = async( req =  request, resp =  response ) => {
    const { id_token } = req.body

    try {
        const { correo, nombre, img } =  await googleVerify( id_token );

        let usuario = await Usuario.findOne( {correo} );

        //crear usuario
        if( !usuario ){
            const data = {
                nombre, 
                correo,
                rol: 'USER_ROLE', 
                password: ':P',
                img,
                google: true
            }

            usuario = new Usuario( data );
            await usuario.save();
        }

        //Si el usuario en DB
        if( !usuario.estado ){
            return resp.status( 401 ).json({
                msg: 'Hable con el administrador, usuario Bloqueado'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );
               

        resp.json({
            usuario, token
        });
        
    } catch (error) {
        resp.status(400).json({
            ok : false,
            msg: 'El token no se puede verificar'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}