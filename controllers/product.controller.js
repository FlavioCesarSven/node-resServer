const { response, request } = require('express');
const { Producto } = require('../models');


const mostrarProductos = async(req = request, res = response ) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const productos = await Producto.find(query).populate('usuario','nombre')
        .skip( desde * 1 )
        .limit( limite * 1 );

    const total = await Producto.countDocuments(query);

    res.json({
        total,
        productos
    });
}

//Obtener Categoria - populate

const mostrarProducto = async( req, res ) => {
    
    const {id} = req.params;

    const producto = await Producto.findById( id )
                    .populate('usuario','nombre')
                    .populate('categoria', 'nombre');

    res.json({
        producto
    })
} 


//Crear una Categoria - admin
const crearProducto = async( req = request, res = response ) => {

    const {estado, usuario, ...body}  = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre});

    if( productoDB ){
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre } ya existe`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(), 
        usuario: req.usuario._id,
    }

    const producto = await Producto( data );

    await producto.save();

    res.status(201).json({
        producto
    });

}

//Actualizar Categoria - populate

const actualizarProducto = async(req, res = response) => {

    const {id} = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, data, {new: true} );

    res.json({
        producto
    })
  }

//Borrar Categoria - categoria false

const EliminarProducto = async(req, res= response) => {

    const {id} = req.params;
    const query = { estado: false };

    const producto = await Producto.findByIdAndUpdate( id, query, {new:true} );

    res.json({
        producto,
    }) 
  }

module.exports = {
    crearProducto,
    mostrarProductos
    ,mostrarProducto,
    actualizarProducto,
    EliminarProducto
}