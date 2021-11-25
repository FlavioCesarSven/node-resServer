const { response } = require('express');
const Role = require('../models/role.model');

const {Usuario, Categoria, Producto} = require('../models');

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
    const existeUsuario = await Usuario.findById( { id } );
    if( !existeUsuario ){
        throw new Error(`El id ${ id } no está registrado en la BD`);
    }
}

//Categoria

const nombreCategoriaExiste = async( nombre = '' ) => {
    
//Verificar si el correo Existe
const existeNombre = await Categoria.findOne(  {nombre}  );
if( existeNombre ){
    throw new Error(`El nombre ${ nombre } ya está registrado en la BD`);
}
}

const exisCategoriaID = async ( id = ''  )=> {

    const idcategoria = await Categoria.findById( id);
    if (!idcategoria ) {
        throw new Error(`El id ${id} no está registrado en la BD`);
    }

}

//Producto

const exisProductoID = async ( id = ''  )=> {

    const idproducto = await Producto.findById( id);
    if (!idproducto ) {
        throw new Error(`El id ${id} no está registrado en la BD`);
    }

}


  module.exports = {
      esRoleValido,
      emailExiste,
      existeUsuarioPorID,

      nombreCategoriaExiste,
      exisCategoriaID

      ,exisProductoID
  }