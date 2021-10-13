const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.model');


const usuarioGet = async(req = request, res = response ) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const usuarios = await Usuario.find(query)
        .skip( desde * 1 )
        .limit( limite * 1 );

    const total = await Usuario.countDocuments(query);

    // const [total, usuarios] = await Promise.all([
    //     Usuario.countDocuments(query),
    //     await Usuario.find(query)
    //     .skip( desde * 1 )
    //     .limit( limite * 1 )
    // ]);

    res.json({

        total,
       usuarios
    })

  }
//Actualizar Usuario
const usuarioPut = async(req, res = response) => {

    const id = req.params.id;
    const { password, google, correo, ...resto } = req.body;

    //Validar contra BD
    if( password ){
        
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )

    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'put API Controllers',
        usuario
    })
  }

//Crear Usuario
const usuarioPost = async(req, res= response) => {  

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario(  { nombre, correo, password, rol }  );

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )

    //Guardar en BD
    await usuario.save();
    
    res.json({
        msg: 'post API Controllers',
        usuario
    })
  }


const usuarioDelete = async(req, res= response) => {

    const {id} = req.params;
    const query = { estado: false };

    //Fisicamente eliminado
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, query );

    res.json({
        usuario,
        
    })
  }

const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API Controllers'
    })
}

module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}