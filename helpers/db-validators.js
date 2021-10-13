const { response } = require('express');
const Role = require('../models/role.model');
const Usuario = require('../models/usuario.model');

const esRoleValido =  async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
      throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
} 

const emailExiste = async( correo = '' ) => {
    
    //Verificar si el correo Existe
    const existeEmail = await Usuario.findOne( { correo } );
    if( existeEmail ){
        throw new Error(`El email ${ correo } ya está registrado en la BD`);
    }
}

const existeUsuarioPorID= async( id = '' ) => {
    
    //Verificar si el correo Existe
    const existeUsuario = await Usuario.findOne( { id } );
    if( !existeUsuario ){
        throw new Error(`El id ${ id } no está registrado en la BD`);
    }
}


  module.exports = {
      esRoleValido,
      emailExiste,
      existeUsuarioPorID
  }