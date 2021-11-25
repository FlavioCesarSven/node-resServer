const { response, request } = require('express');
const { Categoria } = require('../models/');


//Obtener Categoria - paginado - total - populate

const categoriasGet = async(req = request, res = response ) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const categorias = await Categoria.find(query).populate('usuario','nombre')
        .skip( desde * 1 )
        .limit( limite * 1 );

    const total = await Categoria.countDocuments(query);

    res.json({
        total,
       categorias
    });

}

//Obtener Categoria - populate

const categoriaGet = async( req, res ) => {
    
    const id = req.params.id;

    const categoria = await Categoria.findById( id ).populate('usuario','nombre');

    res.json({
        categoria
    })
} 


//Crear una Categoria - admin
const crearCategoria = async( req = request, res = response ) => {

    const nombre  = req.body.nombre.toUpperCase();
    const categoriaDB= await Categoria.findOne({nombre});
    
    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB } ya existe`
        });
    }

    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const categoria = await Categoria( data );

    await categoria.save();

    res.status(201).json({
        categoria
    });

}

//Actualizar Categoria - populate

const categoriaPut = async(req, res = response) => {

    const id = req.params.id;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, {new: true} );

    res.json({
        categoria
    })
  }

//Borrar Categoria - categoria false

const categoriaDelete = async(req, res= response) => {

    const {id} = req.params;
    const query = { estado: false };

    const categoria = await Categoria.findByIdAndUpdate( id, query, {new:true} );

    res.json({
        categoria,
    }) 
  }

module.exports = {
    categoriasGet,
    categoriaGet,
    crearCategoria,
    categoriaPut,
    categoriaDelete
}